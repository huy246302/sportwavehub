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
            <section className="py-16 text-center">
                <h2 className="text-2xl font-bold mb-6">What the Experts Are Saying</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className='bg-white p-6 rounded-lg shadow-md max-w-xs'
                    >
                        <div className="relative mb-4">
                        <Image
                            src={testimonial.imageSrc}
                            alt={testimonial.name}
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                        <div className="absolute top-0 left-0 text-blue-500 text-3xl mt-1 ml-1">&rdquo;</div>
                        </div>
                        <p className="italic mb-2">{testimonial.quote}</p>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-gray-500 text-sm">{testimonial.title} at {testimonial.company}</p>
                    </div>
                    ))}
                </div>
            </section>
    );
};

export default TestimonialsSection;
