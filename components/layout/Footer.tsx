export function Footer() {
  return (
    <footer className="border-t border-[#e4e4e7] bg-white px-4 py-8">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#a1a1aa]">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#0d0d0d]" style={{ fontFamily: "var(--font-bricolage)" }}>
            English<span className="text-[#2563eb]">FromZero</span>
          </span>
          <span>— Học tiếng Anh từ đầu, đúng cách.</span>
        </div>
        <div className="flex gap-5">
          <a href="/kiem-tra" className="hover:text-[#0d0d0d] transition-colors">Kiểm tra trình độ</a>
          <a href="/lo-trinh" className="hover:text-[#0d0d0d] transition-colors">Lộ trình</a>
        </div>
      </div>
    </footer>
  );
}
