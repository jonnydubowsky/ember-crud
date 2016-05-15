Bugs:

1. New and back button.

  - Solution 1 filter out new records.
  - Filter it after the model hook -- nope adding a new record doesn't show up.
  - There is a store filter - deprecated, addonized, dead
  - Use a computed property on the controller
  - What if we ever try to get a count of items?

2. Editing and hitting the back button or a cancel button.

  - Using rollbackAttributes
  - Rollback on `willDestroy`.
  - Won't work well for forms with related models (removal of 'rollback')
  - Still see the item in the list updating

3. Maybe use unbound on the list?

We're fighting this model every step of the way -- adding a band-aid for every
bug we find.

What is `store.findAll('pets')`? Not a snapshot in time -- a stable app wide
collection of our data. We could change our UI to embrace this idea.

* Cancel -> Undo
* New -> Create
* Save -> Update or Sync

But what if we want the common web model?


