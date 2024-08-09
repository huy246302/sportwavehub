import React from 'react';
import Image from 'next/image';
import '@/styles/globals.css';

interface Testimonial {
    name: string;
    title: string;
    company: string;
    imageSrc: string;
    quote: string;
}

const testimonials: Testimonial[] = [
    {
        name: 'John Doe',
        title: 'Sports Journalist',
        company: 'ESPN',
        imageSrc: 'https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-1.jpg',
        quote: "This app has revolutionized the way fans interact with their favorite sports!",
    },
    {
        name: 'Jane Smith',
        title: 'Senior Writer',
        company: 'Sports Illustrated',
        imageSrc: 'https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-2.jpg',
        quote: "A must-have for any sports enthusiast looking to stay connected with the latest news.",
    },
    {
        name: 'Bob Johnson',
        title: 'Editor',
        company: 'Bleacher Report',
        imageSrc: 'https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-3.jpg',
        quote: "The user interface is intuitive and the content is always up-to-date!",
    },
];

const TestimonialsSection: React.FC = () => {
    return (
        <section style={{ padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                What the Experts Are Saying
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className='grid justify-items-center'
                        style={{
                            backgroundColor: '#f9f9f9',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            maxWidth: '300px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <div style={{ position: 'relative', marginBottom: '1rem' }}>
                            <Image
                                src={testimonial.imageSrc}
                                alt={testimonial.name}
                                width={50}
                                height={50}
                                style={{ borderRadius: '50%' }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    left: '35px',
                                    color: '#3b82f6',
                                    fontSize: '2rem',
                                }}
                            >
                                &rdquo;
                            </div>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                                {testimonial.quote}
                            </p>
                            <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                                {testimonial.name}
                            </p>
                            <p style={{ color: '#555', fontSize: '0.875rem' }}>
                                {testimonial.title} at {testimonial.company}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsSection;
