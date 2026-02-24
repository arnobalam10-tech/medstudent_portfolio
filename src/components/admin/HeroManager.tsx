"use client";

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { GlassCard } from '@/components/GlassCard';
import { Save, Upload, Trash2, Image as ImageIcon, Plus, Loader2, Eye, EyeOff } from 'lucide-react';

interface HeroManagerProps {
    initialData: any;
    onUpdate: () => void;
}

const iconOptions = [
    { value: 'BookOpen', label: '📖 Book' },
    { value: 'TrendingUp', label: '📈 Trending' },
    { value: 'Users', label: '👥 Users' },
    { value: 'Award', label: '🏆 Award' },
    { value: 'Stethoscope', label: '🩺 Stethoscope' },
    { value: 'FlaskConical', label: '🧪 Flask' },
    { value: 'Heart', label: '❤️ Heart' },
    { value: 'GraduationCap', label: '🎓 Graduation' },
];

export const HeroManager = ({ initialData, onUpdate }: HeroManagerProps) => {
    const [formData, setFormData] = useState(initialData || {
        greeting: 'Hi, There!',
        name: 'Nafisa Alam',
        subtitle: 'Medical student, researcher, and clinical enthusiast dedicated to bridging the gap between innovative research and patient care.',
        badge_text: 'MBBS Candidate · Class of 2026',
        profile_image_url: '',
        cta_primary_text: 'View Research',
        cta_primary_link: '#research',
        cta_secondary_text: 'Contact Me',
        cta_secondary_link: '#contact',
        social_facebook: '',
        social_instagram: '',
        social_twitter: '',
        social_linkedin: '',
        stats: [
            { icon: 'BookOpen', value: 'MBBS', label: 'Degree Program' },
            { icon: 'TrendingUp', value: '5+', label: 'Research Projects' },
            { icon: 'Users', value: '2000+', label: 'Patients Served' },
            { icon: 'Award', value: '10+', label: 'Certifications' },
        ],
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Parse stats if it's a string
    const stats = typeof formData.stats === 'string' ? JSON.parse(formData.stats) : (formData.stats || []);

    // Parse section visibility
    const rawVis = formData.section_visibility;
    const sectionVisibility = typeof rawVis === 'string' ? JSON.parse(rawVis) : (rawVis || {
        stats: true, academics: true, experience: true, research: true, awards: true, extracurriculars: true,
    });

    const handleToggleSection = (section: string) => {
        const newVis = { ...sectionVisibility, [section]: !sectionVisibility[section] };
        setFormData({ ...formData, section_visibility: newVis });
    };

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleStatChange = (index: number, field: string, value: string) => {
        const newStats = [...stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setFormData({ ...formData, stats: newStats });
    };

    const handleAddStat = () => {
        const newStats = [...stats, { icon: 'Award', value: '', label: '' }];
        setFormData({ ...formData, stats: newStats });
    };

    const handleRemoveStat = (index: number) => {
        const newStats = stats.filter((_: any, i: number) => i !== index);
        setFormData({ ...formData, stats: newStats });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.includes('webp') && !file.type.includes('png') && !file.type.includes('jpeg')) {
            setMessage('Please upload a WebP, PNG, or JPEG image.');
            return;
        }

        setUploading(true);
        setMessage('');

        try {
            const fileName = `hero-profile-${Date.now()}.${file.name.split('.').pop()}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('hero-images')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: true,
                });

            if (uploadError) {
                setMessage(`Upload failed: ${uploadError.message}`);
                setUploading(false);
                return;
            }

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('hero-images')
                .getPublicUrl(fileName);

            setFormData({ ...formData, profile_image_url: urlData.publicUrl });
            setMessage('Image uploaded successfully!');
        } catch (err: any) {
            setMessage(`Upload error: ${err.message}`);
        }

        setUploading(false);
    };

    const handleRemoveImage = () => {
        setFormData({ ...formData, profile_image_url: '' });
    };

    const handleSave = async () => {
        setLoading(true);
        setMessage('');

        const payload = {
            ...formData,
            stats: typeof formData.stats === 'string' ? formData.stats : JSON.stringify(formData.stats),
            section_visibility: typeof formData.section_visibility === 'string' ? formData.section_visibility : JSON.stringify(formData.section_visibility || sectionVisibility),
            updated_at: new Date().toISOString(),
        };

        // Remove id from payload for insert
        const { id, ...payloadWithoutId } = payload;

        let result;
        if (formData.id) {
            result = await supabase.from('hero_settings').update(payloadWithoutId).eq('id', formData.id);
        } else {
            result = await supabase.from('hero_settings').insert(payloadWithoutId).select();
            if (result.data && result.data.length > 0) {
                setFormData({ ...formData, id: result.data[0].id });
            }
        }

        if (result.error) {
            setMessage(`Error saving: ${result.error.message}`);
        } else {
            setMessage('Hero settings saved successfully!');
            onUpdate();
        }

        setLoading(false);
    };

    const inputClass = "w-full rounded-lg bg-[var(--color-pure-white)] p-3 text-[var(--color-jet-black)] border border-[var(--color-ocean-steel)]/30 outline-none focus:border-[var(--color-deep-slate)] transition-colors";
    const labelClass = "mb-1 block text-xs font-bold uppercase text-[var(--color-deep-slate)]";

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[var(--color-jet-black)]">Manage Hero Section</h3>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl accent-gradient-bg px-5 py-2.5 text-sm font-bold text-[var(--color-pure-white)] shadow-md shadow-[var(--color-deep-slate)]/20 transition-transform hover:scale-105 disabled:opacity-50"
                >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Save All
                </button>
            </div>

            {message && (
                <div className={`rounded-lg p-3 text-sm font-medium ${message.includes('Error') || message.includes('failed') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {message}
                </div>
            )}

            {/* Profile Image Upload */}
            <GlassCard>
                <h4 className="text-lg font-semibold mb-4 text-[var(--color-jet-black)]">Profile Photo</h4>
                <div className="flex items-start gap-6">
                    <div
                        className="flex h-40 w-40 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed overflow-hidden"
                        style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}
                    >
                        {formData.profile_image_url ? (
                            <img
                                src={formData.profile_image_url}
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <ImageIcon size={40} style={{ color: 'var(--muted-foreground)' }} />
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                            Upload a background-removed photo (WebP preferred). This will appear on the right side of the hero section.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors hover:bg-[var(--muted)]"
                                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                            >
                                {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                                {uploading ? 'Uploading...' : 'Upload Image'}
                            </button>
                            {formData.profile_image_url && (
                                <button
                                    onClick={handleRemoveImage}
                                    className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                                    style={{ borderColor: 'rgba(239,68,68,0.3)' }}
                                >
                                    <Trash2 size={14} /> Remove
                                </button>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".webp,.png,.jpg,.jpeg"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>
                </div>
            </GlassCard>

            {/* Text Content */}
            <GlassCard>
                <h4 className="text-lg font-semibold mb-4 text-[var(--color-jet-black)]">Hero Text Content</h4>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className={labelClass}>Badge Text</label>
                        <input
                            value={formData.badge_text || ''}
                            onChange={(e) => handleChange('badge_text', e.target.value)}
                            className={inputClass}
                            placeholder="e.g. MBBS Candidate · Class of 2026"
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Greeting</label>
                        <input
                            value={formData.greeting || ''}
                            onChange={(e) => handleChange('greeting', e.target.value)}
                            className={inputClass}
                            placeholder="e.g. Hi, There!"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className={labelClass}>Name</label>
                        <input
                            value={formData.name || ''}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className={inputClass}
                            placeholder="e.g. Nafisa Alam"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className={labelClass}>Subtitle / Description</label>
                        <textarea
                            value={formData.subtitle || ''}
                            onChange={(e) => handleChange('subtitle', e.target.value)}
                            className={`${inputClass} h-24 resize-none`}
                            placeholder="A short description..."
                        />
                    </div>
                </div>
            </GlassCard>

            {/* CTA Buttons */}
            <GlassCard>
                <h4 className="text-lg font-semibold mb-4 text-[var(--color-jet-black)]">Call-to-Action Buttons</h4>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className={labelClass}>Primary Button Text</label>
                        <input
                            value={formData.cta_primary_text || ''}
                            onChange={(e) => handleChange('cta_primary_text', e.target.value)}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Primary Button Link</label>
                        <input
                            value={formData.cta_primary_link || ''}
                            onChange={(e) => handleChange('cta_primary_link', e.target.value)}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Secondary Button Text</label>
                        <input
                            value={formData.cta_secondary_text || ''}
                            onChange={(e) => handleChange('cta_secondary_text', e.target.value)}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Secondary Button Link</label>
                        <input
                            value={formData.cta_secondary_link || ''}
                            onChange={(e) => handleChange('cta_secondary_link', e.target.value)}
                            className={inputClass}
                        />
                    </div>
                </div>
            </GlassCard>

            {/* Social Links */}
            <GlassCard>
                <h4 className="text-lg font-semibold mb-4 text-[var(--color-jet-black)]">Social Media Links</h4>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className={labelClass}>Facebook URL</label>
                        <input
                            value={formData.social_facebook || ''}
                            onChange={(e) => handleChange('social_facebook', e.target.value)}
                            className={inputClass}
                            placeholder="https://facebook.com/..."
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Instagram URL</label>
                        <input
                            value={formData.social_instagram || ''}
                            onChange={(e) => handleChange('social_instagram', e.target.value)}
                            className={inputClass}
                            placeholder="https://instagram.com/..."
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Twitter / X URL</label>
                        <input
                            value={formData.social_twitter || ''}
                            onChange={(e) => handleChange('social_twitter', e.target.value)}
                            className={inputClass}
                            placeholder="https://x.com/..."
                        />
                    </div>
                    <div>
                        <label className={labelClass}>LinkedIn URL</label>
                        <input
                            value={formData.social_linkedin || ''}
                            onChange={(e) => handleChange('social_linkedin', e.target.value)}
                            className={inputClass}
                            placeholder="https://linkedin.com/in/..."
                        />
                    </div>
                </div>
            </GlassCard>

            {/* Section Visibility Toggles */}
            <GlassCard>
                <h4 className="text-lg font-semibold mb-4 text-[var(--color-jet-black)]">Section Visibility</h4>
                <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
                    Toggle sections on or off. Hidden sections won&apos;t appear on the public website. Sections with no data are automatically hidden.
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                    {[
                        { key: 'stats', label: 'Stats / Highlights', desc: 'Stat cards below hero' },
                        { key: 'academics', label: 'Academics', desc: 'Education entries' },
                        { key: 'experience', label: 'Work Experience', desc: 'Internships & observerships' },
                        { key: 'research', label: 'Research', desc: 'Publications & presentations' },
                        { key: 'awards', label: 'Awards & Achievements', desc: 'Licenses & scholarships' },
                        { key: 'extracurriculars', label: 'Extra-Curriculars', desc: 'Volunteering & activities' },
                    ].map((section) => (
                        <button
                            key={section.key}
                            onClick={() => handleToggleSection(section.key)}
                            className="flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200"
                            style={{
                                borderColor: sectionVisibility[section.key] !== false ? 'rgba(54,86,95,0.3)' : 'var(--border)',
                                background: sectionVisibility[section.key] !== false ? 'rgba(54,86,95,0.05)' : 'transparent',
                            }}
                        >
                            <div
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                style={{
                                    background: sectionVisibility[section.key] !== false ? 'linear-gradient(135deg, #36565F, #5F8190)' : 'var(--muted)',
                                    color: sectionVisibility[section.key] !== false ? '#FFFFFF' : 'var(--muted-foreground)',
                                }}
                            >
                                {sectionVisibility[section.key] !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                            </div>
                            <div>
                                <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{section.label}</p>
                                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{section.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </GlassCard>

            {/* Stats Editor */}
            <GlassCard>
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-[var(--color-jet-black)]">Stats / Highlights</h4>
                    <button
                        onClick={handleAddStat}
                        className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-[var(--muted)]"
                        style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    >
                        <Plus size={14} /> Add Stat
                    </button>
                </div>
                <div className="space-y-4">
                    {stats.map((stat: any, idx: number) => (
                        <div key={idx} className="flex items-end gap-3 rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}>
                            <div className="flex-1">
                                <label className={labelClass}>Icon</label>
                                <select
                                    value={stat.icon}
                                    onChange={(e) => handleStatChange(idx, 'icon', e.target.value)}
                                    className={inputClass}
                                >
                                    {iconOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className={labelClass}>Value</label>
                                <input
                                    value={stat.value}
                                    onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                                    className={inputClass}
                                    placeholder="e.g. 5+"
                                />
                            </div>
                            <div className="flex-1">
                                <label className={labelClass}>Label</label>
                                <input
                                    value={stat.label}
                                    onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                                    className={inputClass}
                                    placeholder="e.g. Research Projects"
                                />
                            </div>
                            <button
                                onClick={() => handleRemoveStat(idx)}
                                className="mb-1 text-red-400 hover:text-red-600 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </div>
    );
};
