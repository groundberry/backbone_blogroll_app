// Backbone Model

var Blog = Backbone.Model.extend({
  defaults: {
    author: '',
    title: '',
    url: '',
  },
});

// Backbone Collection

var Blogs = Backbone.Collection.extend({});

// Instantiate two Blogs
var blog1 = new Blog({
  author: 'Blanca',
  title: 'Blanca\'s Blog',
  url: 'http://blancasblog.com',
});

var blog2 = new Blog({
  author: 'John',
  title: 'John\'s Blog',
  url: 'http://johnsblog.com',
});

// Instantiate a Collection

var blogs = new Blogs([blog1, blog2]);
