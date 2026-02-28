export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <span className="text-4xl">🔍</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">No users found</h3>
      <p className="text-gray-500 max-w-sm">
        We couldn't find any users matching your search. Try adjusting your search term.
      </p>
    </div>
  );
}