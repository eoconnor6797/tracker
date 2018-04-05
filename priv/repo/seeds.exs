# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tracker.Repo.insert!(%Tracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias Tracker.Repo
  alias Tracker.Users.User
  alias Tracker.Tasks.Task
  def run do
    p = Comeonin.Argon2.hashpwsalt("password1")

    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "alice", password_hash: p })
    b = Repo.insert!(%User{ name: "bob", password_hash: p })
    c = Repo.insert!(%User{ name: "carol", password_hash: p })
    d = Repo.insert!(%User{ name: "dave", password_hash: p })
    Repo.delete_all(Task)
    Repo.insert!(%Task{ body: "do thing", completed: false, time: 15, title: "test", user: a})
    Repo.insert!(%Task{ body: "do thing", completed: true, time: 15, title: "test", user: a})
    Repo.insert!(%Task{ body: "do thing", completed: false, time: 15, title: "test", user: b})
    Repo.insert!(%Task{ body: "do thing", completed: false, time: 15, title: "test", user: b})

  end
end

Seeds.run
