import { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { Avatar, Container, Flex, TextInput } from '@mantine/core';
import classes from './header.module.css';

const links = [
  { link: '/about', label: 'Home' },
  { link: '/community', label: 'Create' },
];

const Header = () => {
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {/* <p>logo</p> */}
        <Flex gap={5} mr="sm">
          {items}
        </Flex>
        <TextInput
          style={{
            width: '100%',
          }}
          size="md"
          leftSection={<SearchIcon size={19} />}
          radius="xl"
        />
        <Avatar ml="md" src="avatar.png" alt="it's me" size="md" />
      </Container>
    </header>
  );
};

export default Header;
