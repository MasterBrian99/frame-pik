defmodule FramePik.Repo do
  use Ecto.Repo,
    otp_app: :frame_pik,
    adapter: Ecto.Adapters.Postgres
end
