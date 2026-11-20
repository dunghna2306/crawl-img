const ORIGIN = 'https://truyenqq.com.vn';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  const path = typeof req.query.path === 'string' ? req.query.path : '/';
  if (!path.startsWith('/') || path.startsWith('//') || /[\r\n\\]/.test(path)) {
    return res.status(400).json({ error: 'Đường dẫn không hợp lệ.' });
  }
  let target;
  try { target = new URL(path, ORIGIN); } catch { return res.status(400).json({ error: 'URL không hợp lệ.' }); }
  if (target.origin !== ORIGIN) return res.status(400).json({ error: 'Chỉ hỗ trợ trang TruyenQQ.' });
  try {
    const response = await fetch(target, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TruyenQQReader/1.0)', 'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.7' },
      signal: AbortSignal.timeout(12000)
    });
    if (!response.ok) return res.status(response.status).json({ error: `Trang nguồn trả về ${response.status}.` });
    const html = await response.text();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).json({ html, url: target.href });
  } catch (error) {
    return res.status(502).json({ error: 'Không thể lấy trang nguồn lúc này.', detail: error.message });
  }
};

