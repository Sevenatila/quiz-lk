export default function BonusCard({
  icon,
  title,
  oldPrice,
  description,
  index,
}: {
  icon: string;
  title: string;
  oldPrice: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="animate-fadeInUp rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Tag */}
      <div className="mb-3">
        <span className="inline-block text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-red-500 px-3 py-1.5 rounded-lg uppercase tracking-wide leading-snug">
          De R$ {oldPrice} por R$ 0,00 se você agir em 15 min
        </span>
      </div>

      {/* Title */}
      <div className="flex items-start gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <div>
          <h4 className="text-[1.05rem] font-bold text-gray-900 leading-tight">{title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-400 line-through">
              R$ {oldPrice}
            </span>
            <span className="text-lg font-extrabold text-green-600">
              GRÁTIS
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-[0.95rem] text-gray-500 leading-relaxed mt-3">
        {description}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-sm font-semibold bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
          🔥 Bônus Exclusivo
        </span>
        <span className="text-sm font-semibold bg-green-50 text-green-700 px-3 py-1 rounded-full">
          100% GRÁTIS
        </span>
      </div>
    </div>
  );
}
