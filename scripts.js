// Backbone Model

const Blog = Backbone.Model.extend({
  defaults: {
    author: '',
    title: '',
    url: '',
  },
});

// Backbone Collection

const Blogs = Backbone.Collection.extend({});

// Instantiate two Blogs
const blog1 = new Blog({
  author: 'Blanca',
  title: 'Blanca\'s Blog',
  url: 'http://blancasblog.com',
});

const blog2 = new Blog({
  author: 'John',
  title: 'John\'s Blog',
  url: 'http://johnsblog.com',
});

// Instantiate a Collection

const blogs = new Blogs([blog1, blog2]);

// Backbone view for one blog

const BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  initialize() {
    this.template = _.template($('.blogs-list-template').html());
  },
  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// Bckbone view for all blogs

const BlogsView = Backbone.View.extend({
  model: blogs,
  el: $('.blogs-list'),
  initialize() {
    this.model.on('add', this.render, this);
  },
  render() {
    const self = this;
    this.$el.html('');
    _.each(this.model.toArray(), (blog) => {
      self.$el.append((new BlogView({ model: blog })).render().$el);
    });
    return this;
  }
});

const blogsView = new BlogsView();

$(document).ready(() => {
  $('.add-blog').on('click', () => {
    const blog = new Blog({
      author: $('.author-input').val(),
      title: $('.title-input').val(),
      url: $('.url-input').val(),
    });
    blogs.add(blog);
  });
});
