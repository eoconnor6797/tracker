defmodule Tracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :body, :string
    field :completed, :boolean, default: false
    field :time, :integer
    field :title, :string
    belongs_to  :user, Tracker.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    valid_times = 0..96
    valid_times = for n <- valid_times, do: n*15
    task
    |> cast(attrs, [:title, :body, :time, :completed, :user_id])
    |> validate_required([:title, :body, :time, :completed, :user_id])
    |> validate_inclusion(:time, valid_times)
  end
end
