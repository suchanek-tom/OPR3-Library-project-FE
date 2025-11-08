import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Book, EditBookProps } from "../../types/Book";
import { updateBook } from "../../utils/bookApi";
import ErrorMessage from "../ErrorMessage";

const EditBook: FC<EditBookProps> = ({ book, onSuccess, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Partial<Book>>({
    defaultValues: {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publicationYear: book.publicationYear,
      content: book.content,
      available: book.available,
    },
  });

  const onSubmit = async (data: Partial<Book>) => {
    setApiError("");

    try {
      const updatedBook = await updateBook(book.id, data);
      onSuccess(updatedBook);
      setIsEditing(false);
      alert("✅ Book updated successfully!");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Failed to update book");
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className={
          className ||
          "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        }
      >
        ✏️ Edit Book Details
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full max-h-full overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4">Edit Book Details</h3>

        {apiError && <ErrorMessage message={apiError} />}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "Title must be at least 3 characters" },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            {errors.title && (
              <p className="text-red-600 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              type="text"
              {...register("author", {
                required: "Author is required",
                minLength: { value: 2, message: "Author must be at least 2 characters" },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            {errors.author && (
              <p className="text-red-600 text-xs mt-1">{errors.author.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ISBN</label>
            <input
              type="text"
              {...register("isbn", {
                minLength: { value: 10, message: "ISBN must be at least 10 characters" },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            {errors.isbn && (
              <p className="text-red-600 text-xs mt-1">{errors.isbn.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Publication Year</label>
            <input
              type="number"
              {...register("publicationYear", {
                required: "Publication year is required",
                min: { value: 1000, message: "Publication year must be at least 1000" },
                max: { value: new Date().getFullYear(), message: "Publication year cannot be in the future" },
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            {errors.publicationYear && (
              <p className="text-red-600 text-xs mt-1">{errors.publicationYear.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              {...register("content", {
                maxLength: { value: 10000, message: "Description must be less than 10000 characters" },
              })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
            />
            {errors.content && (
              <p className="text-red-600 text-xs mt-1">{errors.content.message}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              {...register("available")}
              className="w-4 h-4 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="available" className="ml-2 text-sm">
              Available for borrowing
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 rounded transition-colors"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
