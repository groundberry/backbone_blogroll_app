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
  events: {
    'click .edit-blog': 'edit',
    'click .update-blog': 'update',
    'click .cancel': 'cancel',
    'click .delete-blog': 'delete',
  },
  edit() {
    $('.edit-blog').hide();
    $('.delete-blog').hide();
    this.$('.update-blog').show();
    this.$('.cancel').show();

    var author = this.$('.author').html();
    var title = this.$('.title').html();
    var url = this.$('.url').html();

    this.$('.author').html('<input type="text" class="form-control author-update" value="' + author + '">');
    this.$('.title').html('<input type="text" class="form-control title-update" value="' + title + '">');
    this.$('.url').html('<input type="text" class="form-control url-update" value="' + url + '">');
  },
  update() {
    var author = this.$('.author-update').val();
    var title = this.$('.title-update').val();
    var url = this.$('.url-update').val();
    this.model.set({author: author, title: title, url: url});﻿
  },
  cancel() {
    blogsView.render();
  },
  delete() {
    this.model.destroy();
  },
  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

// Bckbone view for all blogs

const BlogsView = Backbone.View.extend({
  initialize() {
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'remove', this.render);
  },
  render() {
    this.$el.html('');
    this.collection.each((blog) => {
      const blogView = new BlogView({ model: blog });
      blogView.render();
      this.$el.append(blogView.$el);
    });
    return this;
  },
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
