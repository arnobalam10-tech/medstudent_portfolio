"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function usePortfolioData() {
    const [data, setData] = useState<any>({
        education: [],
        experience: [],
        research: [],
        awards: [],
        extracurriculars: [],
        hero: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { data: education } = await supabase.from('education').select('*').order('order_index');
            const { data: experience } = await supabase.from('experience').select('*').order('order_index');
            const { data: research } = await supabase.from('research').select('*').order('order_index');
            const { data: awards } = await supabase.from('awards').select('*').order('order_index');
            const { data: extracurriculars } = await supabase.from('extracurriculars').select('*').order('order_index');
            const { data: heroData } = await supabase.from('hero_settings').select('*').limit(1);
            const { data: contactData } = await supabase.from('contact_info').select('*').limit(1);

            setData({
                education: education || [],
                experience: experience || [],
                research: research || [],
                awards: awards || [],
                extracurriculars: extracurriculars || [],
                hero: heroData && heroData.length > 0 ? heroData[0] : null,
                contact: contactData && contactData.length > 0 ? contactData[0] : {},
            });
            setLoading(false);
        }

        fetchData();
    }, []);

    return { data, loading };
}
