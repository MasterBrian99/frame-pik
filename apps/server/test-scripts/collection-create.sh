#!/bin/bash

API_URL="http://localhost:3000/api/collection"  # Replace with your API endpoint
AUTH_TOKEN="Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0MDU3ODE2NCwiZXhwIjoxNzQwNjY0NTY0fQ.la42xzSQ5fL6GVw48EiPirsEjYIVGpvYV6OBmR0Qnlyztfs4mV63_Lu44MbPrcVNsTNhSlT2sS74vTaRs_an_rMhJ6DiW4hfrNAd9FGJ7HN1K2y0XN0MmQBOJ1N285aRodvtg0k55MEoXIlycSXKUzULI4Ts4IiFYTFfNTMkq63wpJwR8-eusk2ZXjTcDz-XTjINkm_C_Hopd_SNMkaa5wk0qhB9ALqxTX3PeXx30KwIuFiCKUJjwfZ1iQ6geH7Dh1B4js2y3shpf8nPdqxPeYVOGY9wyQJpShEnkaUyJO6kmXizYH8mQ5ihc-R1FkcrcBsJ6lh5ztn3hmfagUBbJQ" 
IMAGE_PATH="/home/brian/Picture/1677905316234192.png"  # Replace with your image path

# Word lists for name and description
adjectives=("quick" "slow" "happy" "sad" "bright" "dark" "tiny" "large" "gentle" "fierce")
nouns=("cat" "dog" "bird" "fish" "tree" "flower" "house" "car" "book" "star")
verbs=("jumps" "runs" "sings" "eats" "sleeps" "flies" "swims" "reads" "writes" "plays")

for i in {1..100}; do
  # Generate random name (2-3 words)
  name_parts=()
  num_name_words=$(( RANDOM % 2 + 2 )) # 2 or 3 words
  for j in $(seq 1 $num_name_words); do
    name_parts+=("${adjectives[RANDOM % ${#adjectives[@]}]}") # Add a random adjective
    if [[ $j -eq $((num_name_words - 1)) ]]; then # Add noun at the end
        name_parts+=("${nouns[RANDOM % ${#nouns[@]}]}")
    fi
  done
  random_name="${name_parts[*]}"

  # Generate random folderName (1-2 words) with a unique identifier
  folder_name_parts=()
  num_folder_name_words=$(( RANDOM % 2 + 1 )) # 1 or 2 words
  for j in $(seq 1 $num_folder_name_words); do
    folder_name_parts+=("${adjectives[RANDOM % ${#adjectives[@]}]}")
    if [[ $j -eq $((num_folder_name_words - 1)) ]]; then # Add noun at the end
      folder_name_parts+=("${nouns[RANDOM % ${#nouns[@]}]}")
    fi
  done
  random_folderName="${folder_name_parts[*]}_$i"  # Append unique identifier

  # Generate random description (1-2 sentences, 2-4 words per sentence)
  random_description=""
  num_sentences=$(( RANDOM % 2 + 1 )) # 1 or 2 sentences
  for k in $(seq 1 $num_sentences); do
    sentence_parts=()
    num_sentence_words=$(( RANDOM % 3 + 2 )) # 2 to 4 words per sentence
    for l in $(seq 1 $num_sentence_words); do
      # Randomly choose between adjective, noun, or verb
      word_type=$(( RANDOM % 3 ))
      case $word_type in
        0) word="${adjectives[RANDOM % ${#adjectives[@]}]}";;
        1) word="${nouns[RANDOM % ${#nouns[@]}]}";;
        2) word="${verbs[RANDOM % ${#verbs[@]}]}";;
      esac
      sentence_parts+=("$word")
    done
    random_description+="${sentence_parts[*]}." # Add sentence and period
    if [[ $k -lt $num_sentences ]]; then
      random_description+=" " # Add space between sentences
    fi
  done

  # Send the curl request
  response=$(curl --request POST \
    --url "$API_URL" \
    --header "authorization: $AUTH_TOKEN" \
    --header "content-type: multipart/form-data" \
    --form "name=\"$random_name\"" \
    --form "folderName=\"$random_folderName\"" \
    --form "description=\"$random_description\"" \
    --form "file=@$IMAGE_PATH" \
    --silent --write-out "\n%{http_code}")

  http_code=$(echo "$response" | tail -n1)
  if [[ $http_code -eq 200 || $http_code -eq 201 ]]; then
    echo "Request $i sent successfully with folderName: $random_folderName"
  else
    echo "Request $i failed with HTTP code $http_code and response: $(echo "$response" | sed '$d')"
  fi
done