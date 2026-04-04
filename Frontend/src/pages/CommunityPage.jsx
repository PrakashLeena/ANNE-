import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../lib/api';

export default function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [posting, setPosting] = useState(false);

  const fetchPosts = () => api.get('/api/community').then(r => setPosts(r.data)).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { fetchPosts(); }, []);

  const handlePost = async () => {
    if (!content.trim()) return;
    if (!user) return alert('Please sign in to post.');
    try {
      setPosting(true);
      await api.post('/api/community', { content: content.trim(), authorName: user.displayName || user.email });
      setContent('');
      fetchPosts();
    } catch (e) { alert('Post failed.'); } finally { setPosting(false); }
  };

  const handleLike = async (id) => {
    if (!user) return alert('Please sign in to like.');
    try {
      await api.post(`/api/community/${id}/like`);
      fetchPosts();
    } catch (e) {}
  };

  const [commentText, setCommentText] = useState({});
  const handleComment = async (id) => {
    const text = commentText[id]?.trim();
    if (!text) return;
    if (!user) return alert('Please sign in to comment.');
    try {
      await api.post(`/api/community/${id}/comment`, { text, authorName: user.displayName || user.email });
      setCommentText(prev => ({ ...prev, [id]: '' }));
      fetchPosts();
    } catch (e) {}
  };

  return (
    <div style={{ maxWidth:800, margin:'0 auto', padding:'56px 32px' }}>
      <div style={{ marginBottom:36 }}>
        <div style={{ fontSize:'.6875rem', textTransform:'uppercase', letterSpacing:'.08em', color:'var(--primary)', fontWeight:600, marginBottom:9 }}>Community</div>
        <h1 style={{ fontSize:'clamp(1.5rem,2.8vw,2rem)', fontWeight:700, letterSpacing:'-.02em', marginBottom:6 }}>Share & Inspire</h1>
        <p style={{ color:'var(--outline)', fontSize:'.85rem' }}>Post ideas, showcase your projects, and connect with other creators.</p>
      </div>

      {/* Compose */}
      {user ? (
        <div style={{ background:'var(--surface-container)', borderRadius:'1rem', padding:'20px 24px', marginBottom:28 }}>
          <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
            <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg,#ba9eff,#8455ef)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'#000', flexShrink:0 }}>
              {(user.displayName || user.email)?.[0]?.toUpperCase()}
            </div>
            <div style={{ flex:1 }}>
              <textarea value={content} onChange={e => setContent(e.target.value)}
                style={{ width:'100%', background:'var(--surface-high)', border:'none', borderRadius:'.5rem', padding:'12px 14px', color:'var(--on-surface)', fontFamily:'Inter', fontSize:'.875rem', outline:'none', resize:'vertical', minHeight:80 }}
                placeholder="Share an idea, feedback, or showcase your website…" />
              <div style={{ display:'flex', justifyContent:'flex-end', marginTop:10 }}>
                <button onClick={handlePost} className="btn-primary" style={{ padding:'9px 20px', opacity: posting ? .7 : 1 }} disabled={posting}>
                  {posting ? 'Posting…' : 'Post →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ background:'var(--surface-container)', borderRadius:'1rem', padding:'20px 24px', marginBottom:28, textAlign:'center' }}>
          <p style={{ color:'var(--outline)', marginBottom:12 }}>Sign in to post and interact with the community.</p>
          <Link to="/login" className="btn-primary" style={{ textDecoration:'none' }}>Sign In →</Link>
        </div>
      )}

      {/* Posts */}
      {loading ? (
        <div style={{ textAlign:'center', padding:40, color:'var(--outline)' }}>Loading posts…</div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign:'center', padding:40 }}>
          <div style={{ fontSize:'2.5rem', marginBottom:12 }}>💬</div>
          <p style={{ color:'var(--outline)' }}>No posts yet. Be the first to share!</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {posts.map(post => (
            <div key={post._id} style={{ background:'var(--surface-container)', borderRadius:'1rem', padding:'20px 24px' }}>
              {/* Author */}
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#53ddfc,#8455ef)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'#000', fontSize:'.85rem' }}>
                  {post.authorName?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize:'.85rem', fontWeight:600, color:'var(--on-surface)' }}>{post.authorName}</div>
                  <div style={{ fontSize:'.65rem', color:'var(--outline)' }}>{new Date(post.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              {/* Content */}
              <p style={{ fontSize:'.9rem', lineHeight:1.65, color:'var(--on-surface-var)', marginBottom:16 }}>{post.content}</p>
              {/* Like */}
              <div style={{ display:'flex', gap:16, alignItems:'center', paddingTop:14, borderTop:'1px solid rgba(64,72,93,.2)' }}>
                <button onClick={() => handleLike(post._id)} style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:5, color:'var(--outline)', fontSize:'.8rem', fontFamily:'Inter', transition:'color .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color='var(--primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='var(--outline)'; }}
                >
                  <span>❤️</span> {post.likes?.length || 0} Likes
                </button>
                <span style={{ fontSize:'.8rem', color:'var(--outline)' }}>💬 {post.comments?.length || 0} Comments</span>
              </div>
              {/* Comments */}
              {post.comments?.length > 0 && (
                <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:8 }}>
                  {post.comments.map((c, i) => (
                    <div key={i} style={{ background:'var(--surface-high)', borderRadius:'.5rem', padding:'8px 12px', fontSize:'.78rem' }}>
                      <span style={{ color:'var(--primary)', fontWeight:600 }}>{c.authorName}:</span>
                      <span style={{ color:'var(--on-surface-var)', marginLeft:6 }}>{c.text}</span>
                    </div>
                  ))}
                </div>
              )}
              {/* Comment input */}
              {user && (
                <div style={{ display:'flex', gap:8, marginTop:12 }}>
                  <input value={commentText[post._id] || ''} onChange={e => setCommentText(prev => ({ ...prev, [post._id]: e.target.value }))}
                    style={{ flex:1, background:'var(--surface-high)', border:'none', borderRadius:'.5rem', padding:'8px 12px', color:'var(--on-surface)', fontFamily:'Inter', fontSize:'.78rem', outline:'none' }}
                    placeholder="Write a comment…"
                    onKeyDown={e => e.key === 'Enter' && handleComment(post._id)} />
                  <button onClick={() => handleComment(post._id)} className="btn-primary" style={{ padding:'8px 16px', fontSize:'.75rem' }}>Reply</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
