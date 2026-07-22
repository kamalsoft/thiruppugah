import Image from 'next/image';

export default function GopuramIcon({ className = "w-9 h-9" }: { className?: string }) {
    return (
        <img
            src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTgrTI_RxNZpC581JtQErhXEHof1mfMZ6snTorrmFzrzQHobo_yysV1lH-Yy_upgaiadTVVoK2TDKLFnOg"
            alt="Thiruchendur Gopuram"
            className={`${className} object-cover rounded-md border border-amber-400/40 shadow-sm`}
        />
    );
}