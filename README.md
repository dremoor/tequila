[![Build Status](https://secure.travis-ci.org/visionmedia/mocha.png)](http://travis-ci.org/visionmedia/mocha)
#tequila
Tequila es bueno!

TODO:

* fix node tests
* check out instanbul for node test coverage
* create image attribute
* make validation for types
* have stores validate before saving
* create redis-store
* create json-file-store
* create cookie-store
* create local-store
* create resource-file-store (sound, image, pdf, misc subclass resource-class make atribute type)
* tequilaStore needs to be set not hard coded
* fix Test variations on getList method test for remote stores
* add visible attribute to attribute and default by type on creation
* Finish INTERFACE design

tequila library
- view-model ... extend model with view state (CRUD)
    - originalValue - property
    - action - delete, update
    - modified ... any values <> originalValues

- interface-class
    - present( view, callback(view, error) )

- command-class

- application-class
    - execute ( command, store, interface, callback(command, error) )

interfaces
- bootstrap-interface
- cli-interface




INTERFACE DESIGN (PART OF TEQUILA)

* T.app.structure

* -> execute(Command)

* present -- method with function callback

    * Present       -> (dialogView)
    * callback      <- (dialogView)     Generic Response

    * Present       -> (listView)
    * callback      <- (listView)       Generic Response

    * Present       -> (modelListView)
    * callback      <- (modelListView)  Update Multiple Model Changes

    * Present       -> (modelView)
    * callback      <- (modelView)      Update Single Model Changes

concepts...

## Project Root
+ **/bin** tequila command line interface
+ **/lib** tequila library source code
+ [**/test-spec**](test-spec/README.md) Tequila Specifications, Documentation, Unit Tests, Integration Tests & Regression Tests
