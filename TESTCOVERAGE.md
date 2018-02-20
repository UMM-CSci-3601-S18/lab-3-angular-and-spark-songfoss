E2E test behaviors:

The key behaviors we tested with the E2E test were the usage of the filters. The
filters were: filterByStatus, filterByBody, filerByCategory and filterByOwner.
The filters were tested by giving each filter an input to filer on and return the
set of todos that contain the results of the given filter query. The test would grab
the first element in that set and compare category to an expected category.
Each test needs to click a dropdown menu in order to type strings into the form field.
We tested each filter individually and then did a combination of all filters for a test. 
