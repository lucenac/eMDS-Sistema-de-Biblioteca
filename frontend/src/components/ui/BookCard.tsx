import { StarIcon } from '@heroicons/react/24/solid';

interface BookCardProps {
    title: string;
    author: string;
    category: string;
    rating?: number;
    coverColor?: string;
    coverUrl?: string;
}

export const BookCard = ({ title, author, category, rating = 4, coverColor = 'bg-blue-600', coverUrl }: BookCardProps) => {
    return (
        <div className="flex flex-col gap-3 group cursor-pointer w-full max-w-[180px]">
            {/* 3D Book Cover Effect */}
            <div className="relative aspect-[2/3] perspective-500">
                <div className={`
            absolute inset-0 rounded-r-md shadow-2xl overflow-hidden
            group-hover:-translate-y-4 group-hover:-translate-x-1 group-hover:rotate-y-[-10deg] 
            transition-all duration-500 ease-out origin-left
            ${!coverUrl ? coverColor : 'bg-white'}
            flex flex-col border-l-4 border-white/20
        `}>
                    {coverUrl ? (
                        <img
                            src={coverUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex flex-col p-3 h-full">
                            {/* Spine Highlight */}
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/20 to-transparent"></div>

                            {/* Content on Cover */}
                            <div className="mt-4 text-white/90">
                                <h3 className="font-serif font-bold text-lg leading-tight drop-shadow-md line-clamp-3">{title}</h3>
                                <p className="text-xs mt-2 text-white/70 italic line-clamp-1">{author}</p>
                            </div>

                            {/* Decorative bottom element */}
                            <div className="mt-auto flex justify-center">
                                <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                                    <span className="text-[10px] text-white/50">eMDS</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Shadow/Page effect behind */}
                <div className="absolute inset-0 bg-white rounded-r-md translate-x-1 translate-y-1 -z-10 shadow-lg group-hover:translate-x-3 group-hover:translate-y-4 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gray-200 rounded-r-md translate-x-2 translate-y-2 -z-20 shadow-md group-hover:translate-x-5 group-hover:translate-y-6 transition-all duration-500"></div>
            </div>

            {/* Info */}
            <div className="text-center mt-2 group-hover:opacity-100 transition-opacity">
                <div className="flex justify-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`h-3 w-3 ${i < rating ? 'text-accent-yellow' : 'text-gray-600'}`} />
                    ))}
                </div>
                <span className="inline-block px-2 py-0.5 rounded-md bg-surface border border-white/10 text-[10px] text-indigo-200 uppercase tracking-widest">
                    {category}
                </span>
            </div>
        </div>
    );
};
