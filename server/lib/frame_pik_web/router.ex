defmodule FramePikWeb.Router do
  use FramePikWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", FramePikWeb do
    pipe_through :api
  end
end
