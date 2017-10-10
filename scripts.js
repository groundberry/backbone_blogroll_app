// Backbone Model

const Blog = Backbone.Model.extend({
  defaults: {
    author: '',
    title: '',
    url: '',
  },
});

// Backbone Collection

const Blogs = Backbone.Collection.extend({
  model: Blog,
});

// Instantiate two Blogs
// const blog1 = new Blog({
//   author: 'Blanca',
//   title: 'Blanca\'s Blog',
//   url: 'http://blancasblog.com',
// });
//
// const blog2 = new Blog({
//   author: 'John',
//   title: 'John\'s Blog',
//   url: 'http://johnsblog.com',
// });

// Instantiate a Collection

const blogs = new Blogs();

// Backbone view for one blog

const BlogView = Backbone.View.extend({
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
  initialize() {
    this.listenTo(this.collection, 'add', this.render);
  },
  render() {
    this.$el.html('');
    this.collection.each((blog) => {
      const blogView = new BlogView({ model: blog });
      blogView.render();
      this.$el.append(blogView.$el);
    });
    return this;
  }
});

const blogsView = new BlogsView({
  collection: blogs,
  el: $('.blogs-list'),
});
blogsView.render();

$(document).ready(() => {
  $('.add-blog').on('click', () => {
    const blog = new Blog({
      author: $('.author-input').val(),
      title: $('.title-input').val(),
      url: $('.url-input').val(),
    });
    $('.author-input').val('');
    $('.title-input').val('');
    $('.url-input').val('');
    blogs.add(blog);
  });
});
