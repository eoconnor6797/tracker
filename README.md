# Tracker

# Design
This app is based on Nat Tuck's microblog found here https://github.com/NatTuck/microblog-spa
Much of the code is borrowed from there and refactored for the purpose of this app.

When users are not logged in there will be a form in the nav bar for a username and password. Users can either click "log in" if they already have an account or "sign up" to create an account. Either button will use the credentials entered in the form in the nav bar. Pressing the "sign up" button will also log the user in with the credentials provided that their account was created successfully.

The main page is the "Feed" where all the tasks are listed.
If a user is logged in they will also see a form to create a new task.
There is a separate page for completed tasks.
Users can assign any other user a task.
Users can edit any task assigned to them.
The title and body of a task cannot be editted.

As this is a single-page app, page reloads may break some things.

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
