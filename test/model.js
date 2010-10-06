$(document).ready(function() {

  module("Backbone model");

  test("model: clone", function() {
      attrs = { 'foo': 1, 'bar': 2, 'baz': 3};
      a = new Backbone.Model(attrs);
      b = a.clone();
      equals(a.get('foo'), 1);
      equals(a.get('bar'), 2);
      equals(a.get('baz'), 3);
      equals(b.get('foo'), a.get('foo'), "Foo should be the same on the clone.");
      equals(b.get('bar'), a.get('bar'), "Bar should be the same on the clone.");
      equals(b.get('baz'), a.get('baz'), "Baz should be the same on the clone.");
  });

  test("model: isEqual", function() {
      attrs = { 'foo': 1, 'bar': 2, 'baz': 3};
      a = new Backbone.Model(attrs);
      b = new Backbone.Model(attrs);
      ok(a.isEqual(b), "a should equal b");
      c = new Backbone.Model({ 'foo': 1, 'bar': 2, 'baz': 3, 'qux': 4});
      ok(!a.isEqual(c), "a should not equal c");
  });

  test("model: isNew", function() {
      attrs = { 'foo': 1, 'bar': 2, 'baz': 3};
      a = new Backbone.Model(attrs);
      ok(a.isNew(), "it should be new");
      attrs = { 'foo': 1, 'bar': 2, 'baz': 3, 'id': -5 };
      ok(a.isNew(), "any defined ID is legal, negative or positive");
  });

  test("model: set", function() {
      attrs = { 'foo': 1, 'bar': 2, 'baz': 3};
      a = new Backbone.Model(attrs);
      var changeCount = 0;
      a.bind("change", function() { changeCount += 1; });
      a.set({'foo': 2});
      ok(a.get('foo')== 2, "Foo should have changed.");
      ok(changeCount == 1, "Change count should have incremented.");
      a.set({'foo': 2}); // set with value that is not new shouldn't fire change event
      ok(a.get('foo')== 2, "Foo should NOT have changed, still 2");
      ok(changeCount == 1, "Change count should NOT have incremented.");

      a.unset('foo');
      ok(a.get('foo')== null, "Foo should have changed");
      ok(changeCount == 2, "Change count should have incremented for unset.");

  });

});