from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomePageView.as_view(), name='index'),
    path('books/', views.BookListView.as_view(), name='books'),
    path('book/<int:pk>', views.BookDetailView.as_view(), name='book-detail'),
    # re_path(r'^book/(?P<pk>\d+)$',
    #         views.BookDetailView.as_view(), name='book-detail')
    path('authors/', views.AuthorListView.as_view(), name='authors'),
    path('author/<int:pk>', views.AuthorDetailView.as_view(), name='author-detail'),
]

# list views of borrowed book instances
urlpatterns += [
    path('mybooks/', views.LoanedBooksByUserListView.as_view(), name='my-borrowed'),
    path('borrowed/', views.LoanedBooksAllListView.as_view(), name='all-borrowed')
]

# renew forms for borrowed book instances
urlpatterns += [
    path('book/<uuid:pk>/renew/', views.renew_book_librarian,
         name='renew-book-librarian')
]

# add, update, delete forms for authors
urlpatterns += [
    path('author/create/', views.AuthorCreate.as_view(), name='author_create'),
    path('author/<int:pk>/update/',
         views.AuthorUpdate.as_view(), name='author_update'),
    path('author/<int:pk>/delete/',
         views.AuthorDelete.as_view(), name='author_delete'),
]

# add, update, delete forms for books
urlpatterns += [
    path('book/create/', views.BookCreate.as_view(), name='book_create'),
    path('book/<int:pk>/update/',
         views.BookUpdate.as_view(), name='book_update'),
    path('book/<int:pk>/delete/',
         views.BookDelete.as_view(), name='book_delete'),
]
