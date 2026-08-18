export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <p className="text-primary-500 font-semibold mb-2 uppercase tracking-wider text-sm">{subtitle}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{title}</h2>
      <div className="w-20 h-1 bg-primary-300 mx-auto mt-4 rounded-full"></div>
    </div>
  );
}