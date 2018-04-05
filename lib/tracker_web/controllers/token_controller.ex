defmodule TrackerWeb.TokenController do
  use TrackerWeb, :controller
  alias Tracker.Users.User

  action_fallback TrackerWeb.FallbackController
  # Based on Nat Tuck's notes
  def create(conn, %{"name" => name, "pass" => pass}) do
    with {:ok, %User{} = user} <- Tracker.Users.get_and_auth_user(name, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end
