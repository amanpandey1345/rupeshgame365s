import React from 'react'
import '@/designs/Results.css'
import { BiHistory } from "react-icons/bi";
import Link from 'next/link';

const Results = () => {
    return (
        <>
            <section id='results'>
                <span><Link style={{textDecoration:'none', color:"white"}} href="/dashboard"><BiHistory id='history-icon' /></Link></span>
                <span>Dragon</span>
                <span>Tie</span>
                <span>Tiger</span>
                <span>Tiger</span>
                <span>Tiger</span>
                <span>Tiger</span>
                <span>Tiger</span>
                <span>Tiger</span>
                <span>Tiger</span>
                <span>Tiger</span>
                <span>dragon</span>

            </section>
        </>
    )
}

export default Results