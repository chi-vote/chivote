import datetime
from random import randrange

from django.urls import reverse, reverse_lazy
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.views import generic
from django.views.generic.base import TemplateView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.contrib.auth.decorators import permission_required

from bakery.views import BuildableDetailView, BuildableListView, BuildableTemplateView

from .forms import RenewBookForm, RenewBookModelForm
from .models import Book, Author, BookInstance, Genre


class HomePageView(BuildableTemplateView):
    """View function for home page of site."""
    # template_name = 'index.html'
    template_name = 'react-demo.html'
    build_path = 'catalog/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Generate counts of some of the main objects
        # The 'all()' is implied by default.
        num_books = Book.objects.count()
        num_instances = BookInstance.objects.count()

        # Available books (status = 'a')
        num_instances_available = BookInstance.objects.filter(
            status__exact='a').count()

        # The 'all()' is implied by default.
        num_authors = Author.objects.count()

        # Generate counts of books based on genre
        num_books__fantasy = Book.objects.filter(
            genre__name__icontains='fantasy').count()

        num_books__children = Book.objects.filter(
            genre__name__icontains='children').count()

        # Before, this was a function called index(request)
        # Number of visits to this view, as counted in the session variable.
        # sets value to 0 if not already set
        # num_visits = request.session.get('num_visits', 0)
        # request.session['num_visits'] = num_visits + 1

        context_dict = {
            'num_books': num_books,
            'num_instances': num_instances,
            'num_instances_available': num_instances_available,
            'num_authors': num_authors,
            'num_books__fantasy': num_books__fantasy,
            'num_books__children': num_books__children,
            'num_visits': randrange(10),
            'env': 'Django'
        }

        react_dict = {
            'component': 'App',
            'props': context_dict,
        }

        # context.update(context_dict)
        context.update(react_dict)

        return context


class BookListView(BuildableListView):
    """
    Generates a page that will feature a list linking to detail pages about
    each object in the queryset.
    """
    model = Book
    # paginate_by = 10
    build_path = 'catalog/books/index.html'


class BookDetailView(BuildableDetailView):
    """
    Generates a separate HTML page for each object in the queryset.
    """
    model = Book


class AuthorListView(BuildableListView):
    model = Author
    # paginate_by = 10
    build_path = 'catalog/authors/index.html'


class AuthorDetailView(BuildableDetailView):
    model = Author


class LoanedBooksByUserListView(LoginRequiredMixin, generic.ListView):
    """Generic class-based view listing books on loan to current user."""
    model = BookInstance
    template_name = 'catalog/bookinstance_list_borrowed_user.html'
    paginate_by = 10

    def get_queryset(self):
        return BookInstance.objects.filter(borrower=self.request.user).filter(status__exact='o').order_by('due_back')


class LoanedBooksAllListView(PermissionRequiredMixin, generic.ListView):
    """Generic class-based view listing all books on loan."""
    permission_required = 'catalog.can_mark_returned'
    model = BookInstance
    template_name = 'catalog/bookinstance_list_borrowed_all.html'
    paginate_by = 10

    def get_queryset(self):
        return BookInstance.objects.filter(status__exact='o').order_by('due_back')


@permission_required('catalog.can_mark_returned')
def renew_book_librarian(request, pk):
    """View function for renewing a specific BookInstance by librarian."""
    book_instance = get_object_or_404(BookInstance, pk=pk)

    # If this is a POST request then process the Form data
    if request.method == 'POST':

        # Create a form instance and populate it with data from the request (binding):
        book_renewal_form = RenewBookModelForm(request.POST)

        # Check if the form is valid:
        if book_renewal_form.is_valid():
            # process the data in form.cleaned_data as required (here we just write it to the model due_back field)
            book_instance.due_back = book_renewal_form.cleaned_data['due_back']
            book_instance.save()

            # redirect to a new URL:
            return HttpResponseRedirect(reverse('all-borrowed'))

    # If this is a GET (or any other method) create the default form.
    else:
        proposed_renewal_date = datetime.date.today() + datetime.timedelta(weeks=3)
        book_renewal_form = RenewBookModelForm(
            initial={'due_back': proposed_renewal_date})

    context = {
        'form': book_renewal_form,
        'book_instance': book_instance,
    }

    return render(request, 'catalog/book_renew_librarian.html', context)


class AuthorCreate(PermissionRequiredMixin, CreateView):
    permission_required = 'catalog.add_author'
    model = Author
    fields = '__all__'
    # initial = {'date_of_death': '05/01/2018'}


class AuthorUpdate(PermissionRequiredMixin, UpdateView):
    permission_required = 'catalog.change_author'
    model = Author
    fields = ['first_name', 'last_name', 'date_of_birth',
              'date_of_death']  # same as '__all__'


class AuthorDelete(PermissionRequiredMixin, DeleteView):
    permission_required = 'catalog.delete_author'
    model = Author
    success_url = reverse_lazy('authors')


class BookCreate(PermissionRequiredMixin, CreateView):
    permission_required = 'catalog.add_book'
    model = Book
    fields = '__all__'
    # initial = {'date_of_death': '05/01/2018'}


class BookUpdate(PermissionRequiredMixin, UpdateView):
    permission_required = 'catalog.change_book'
    model = Book
    fields = '__all__'


class BookDelete(PermissionRequiredMixin, DeleteView):
    permission_required = 'catalog.delete_book'
    model = Book
    success_url = reverse_lazy('books')
