import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          English: "English",
          Russian: "Russian",
          Navbar: {
            Books: "Books",
            Authors: "Authors",
            MyCollection: "My Collection",
            AddBook: "Add Book",
            AddAuthor: "Add Author",
            Register: "Register",
            Login: "Login",
            Logout: "Logout"
          },
          Books: {
            AddToCollection: "To Collection",
            EnterYourReview: "Publish your review",
            WriteYourReview: "Write your review",
            Publish: "Publish",
            Reviews: "Reviews",
            NoCommentsYet: "No reviews yet. Be the first to leave a review!",
            CommentError: "Comment creation error!",
            Publishing: "Publishing...",
            BookIdError: "Invalid id",
            FetchError: "Something happened when trying to fetch book details. Try again later.",
            DeleteButton: "Delete",
            ConfirmDelete: "Are you sure you want to delete a book?",
            DeleteFailed: "Failed to delete the book",
            DeleteSuccessful: "Book was deleted successfully!",
            AddToCollectionSuccess: "Book was added to your collection successfully!",
            AddToCollectionFailed: "Book was not added to your collection because of error!",
            BookAlreadyInCollection: "Book is already in your collection!",
            Collection: {
              InProgress: "In progress",
              Planned: "Planned",
              Read: "Read"
            },
            SummaryValidationError: "Summary should be more than 2 characters and less than 2000 characters!",
            EditError: "Something went wrong when editing!",
            EditSummary: "Edit",
            SaveSummary: "Save"
          },
          Login: {
            Login: "Login",
            LoginError: "Login failed. Please try again",
            Password: "Password"
          },
          Register: {
            Register: "Register",
            Login: "Login",
            Password: "Password",
            FirstName: "First Name",
            LastName: "Last Name",
            RegisterError: "Registration failed. Please try again.",
            Role: "Role",
            Admin: "Admin",
            User: "User"
          },
          Pagination: {
            Previous: "Previous",
            Next: "Next",
            Page: "Page",
            Of: "of"
          },
          LanguageSelector: {
            Language: "Language",
            English: "English",
            Russian: "Russian"
          },
          AuthorDetails: {
            FetchError: "Something happened when trying to fetch author details. Try again later.",
            AuthorsBooks: "Author's books",
            Description: "Description",
            Birthdate: "Birthdate:"
          },
          AddAuthor: {
            ImageError: "Only image files (JPEG, PNG, etc.) are allowed.",
            FirstNameRequiredError: "First Name is required.",
            FirstNameSizeError: "First Name must be between 2 and 50 characters.",
            LastNameRequiredError: "Last Name is required.",
            LastNameSizeError: "Last Name must be between 2 and 50 characters.",
            BirthdateRequiredError: "Birth Date is required.",
            BirthdatePastError: "Birth Date must be in the past.",
            SummaryRequiredError: "Summary is required.",
            SummarySizeError: "Summary must be between 2 and 2000 characters.",
            UploadError: "Failed to upload image.",
            AuthenticationError: "Authentication required.",
            AuthorCreatedAlert: "Author created successfully!",
            AuthorCreatedErrorAlert: "Author was not created because of error.",
            FirstName: "First Name:",
            LastName: "Last Name:",
            Birthdate: "Birth Date:",
            Summary: "Summary:",
            CoverPhoto: "Cover Photo (optional):",
            UploadingImage: "Uploading image...",
            CreateAuthorButton: "Create Author"
          },
          AddBook: {
            AuthorsFetchError: "Failed to fetch authors", 
            AuthorRequiredError: "Author is required.",
            GenreRequiredError: "Genre is required.",
            GenreSizeError: "Genre cannot exceed 50 characters.",
            TitleRequiredError: "Title is required.",
            TitleSizeError: "Title must be between 2 and 100 characters.",
            BookCreatedAlert: "Book created successfully!",
            BookCreatedErrorAlert: "Failed to create book.",
            Author: "Author",
            SelectAuthor: "Select an author",
            Title: "Title",
            Genre: "Genre",
            CreateBookButton: "Create Book"
          },
          Time: {
            At: "at"
          },
          Collection: {
            Status: {
              IN_PROGRESS: "In Progress",
              READ: "Read",
              PLANNED: "Planned",
              Status: "Status:",
            },
            ConfirmDelete: "Are you sure you want to delete this book from your collection?",
            ReadDate: "Read date:",
            DeleteError: "Something went wrong during book deletion!",
            DeleteSuccess: "Book was deleted successfully!",
            StatusChangeSuccess: "Status was changed successfully!",
            StatusChangeError: "There was an error during update of the status!",
            SaveChanges: "Save",
            CancelEdit: "Cancel",
            EditButton: "Edit",
            NoBooks: "You don't have any book in your collection!"
          }
        },
      },
      ru: {
        translation: {
          English: "Английский",
          Russian: "Русский",
          Navbar: {
            Books: "Книги",
            Authors: "Авторы",
            MyCollection: "Моя коллекция",
            AddBook: "Добавить книгу",
            AddAuthor: "Добавить автора",
            Register: "Регистрация",
            Login: "Логин",
            Logout: "Выйти"
          },
          Books: {
            AddToCollection: "В коллекцию",
            EnterYourReview: "Опубликуйте свою рецензию",
            WriteYourReview: "Напишите свою рецензию",
            Publish: "Опубликовать",
            Reviews: "Рецензии",
            NoCommentsYet: "На данный момент нет рецензий. Оставьте первую!",
            CommentError: "Произошла ошибка при добавлении комментария!",
            Publishing: "Публикуется...",
            BookIdError: "Невалиден id",
            FetchError: "Произошла ошибка во время получения информации о книге. Попробуйте позже.",
            DeleteButton: "Удалить",
            ConfirmDelete: "Вы уверены что вы хотите удалить книгу?",
            DeleteFailed: "Не удалось удалить книгу",
            DeleteSuccessful: "Книга была удалена успешно!",
            AddToCollectionSuccess: "Книга была успешно добавлена в вашу коллекцию!",
            AddToCollectionFailed: "Книга не была добавлена в вашу коллекцию из-за ошибки!",
            BookAlreadyInCollection: "Книга уже находится в вашей коллекции!",
            Collection: {
              InProgress: "В процессе",
              Planned: "Запланирована",
              Read: "Прочитана"
            },
            SummaryValidationError: "Описание должно состоять из более чем 2 символов и быть меньше чем 2000 символов!",
            EditError: "Произошла ошибка во время редактирования описания!",
            EditSummary: "Изменить",
            SaveSummary: "Сохранить"
          },
          Login: {
            Login: "Логин",
            LoginError: "Логин неуспешный. Пожалуйста попробуйте снова",
            Password: "Пароль"
          },
          Register: {
            Register: "Регистрация",
            Login: "Логин",
            Password: "Пароль",
            FirstName: "Имя",
            LastName: "Фамилия",
            RegisterError: "Регистрация не удалась. Попробуйте позже.",
            Role: "Роль",
            Admin: "Админ",
            User: "Пользователь"
          },
          Pagination: {
            Previous: "Предыдущая",
            Next: "Следующая",
            Page: "Страница",
            Of: "из"
          },
          LanguageSelector: {
            Language: "Язык",
            English: "Английский",
            Russian: "Русский"
          },
          AuthorDetails: {
            FetchError: "Произошла ошибка во время получения информации о авторе. Попробуйте позже.",
            AuthorsBooks: "Книги автора",
            Description: "Описание",
            Birthdate: "Дата рождения:"
          },
          AddAuthor: {
            ImageError: "Только изображения (JPEG, PNG, итд.) разрешены.",
            FirstNameRequiredError: "Имя не должно быть пустым.",
            FirstNameSizeError: "Имя должно иметь от 2 до 50 символов.",
            LastNameRequiredError: "Фамилия не должна быть пустой.",
            LastNameSizeError: "Фамилия должна иметь от 2 до 50 символов.",
            BirthdateRequiredError: "Дата рождения не должна быть пустой.",
            BirthdatePastError: "Дата рождения должна быть в прошлом.",
            SummaryRequiredError: "Описание не должно быть пустым",
            SummarySizeError: "Описание должно иметь от 2 до 2000 символов.",
            UploadError: "Не удалось загрузить фото.",
            AuthenticationError: "Нужна аутентификация.",
            AuthorCreatedAlert: "Автор успешно создан!",
            AuthorCreatedErrorAlert: "Автор не был создан из-за ошибки.",
            FirstName: "Имя:",
            LastName: "Фамилия:",
            Birthdate: "Дата рождения:",
            Summary: "Описание:",
            CoverPhoto: "Фото (опционально):",
            UploadingImage: "Загрузка фото...",
            CreateAuthorButton: "Создать автора"
          },
          AddBook: {
            AuthorsFetchError: "Не удалось загрузить авторов", 
            AuthorRequiredError: "Необходим автор.",
            GenreRequiredError: "Необходим жанр.",
            GenreSizeError: "Жанр не должен привышать 50 символов.",
            TitleRequiredError: "Название не должно быть пустым.",
            TitleSizeError: "Название должно иметь от 2 до 2000 символов.",
            BookCreatedAlert: "Книга создана успешно!",
            BookCreatedErrorAlert: "Не удалось создать книгу.",
            Author: "Автор",
            SelectAuthor: "Выберите автора",
            Title: "Название",
            Genre: "Жанр",
            CreateBookButton: "Создать книгу"
          },
          Time: {
            At: "в"
          },
          Collection: {
            Status: {
              IN_PROGRESS: "В процессе",
              READ: "Прочитана",
              PLANNED: "Запланирована",
              Status: "Статус:"
            },
            ConfirmDelete: "Вы уверены что вы хотите удалить данную книгу из своей коллекции?",
            ReadDate: "Дата прочтения:",
            DeleteError: "Произошла ошибка во время удаления книги из коллекции!",
            DeleteSuccess: "Книга удалена успешно!",
            StatusChangeSuccess: "Статус был успешно изменен!",
            StatusChangeError: "Возникла ошибка при обновлении статуса!",
            SaveChanges: "Сохранить",
            CancelEdit: "Отменить",
            EditButton: "Редактировать",
            NoBooks: "У вас нет ни одной книги в коллеции!"
          },
        },
      },
    },
  });

export default i18n;
