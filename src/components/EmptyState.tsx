export default function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center text-gray-500">
      <div className="text-5xl">🔍</div>
      <p className="text-lg font-medium">No users found</p>
      <p className="text-sm">Try adjusting your search term.</p>
    </div>
  );
}
