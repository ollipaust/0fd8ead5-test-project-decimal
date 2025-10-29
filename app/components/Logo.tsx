import { motion } from 'framer-motion';

interface LogoProps {
    text?: string;
}

// Using regular function instead of React.FC to avoid the prop-types ESLint error
const Logo = ({ text = 'Logo' }: LogoProps): JSX.Element => {
    return (
        <div className='flex justify-center items-center gap-2'>
            <motion.img
                src='/img/logo/logo.png'
                alt='decimal logo'
                className='w-8 h-8'
                initial={{
                    x: -10,
                    opacity: 0,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.5,
                    delay: 0.2,
                    ease: 'easeOut',
                }}
            />
            <div className='flex w-full'>
                {text.split('').map((letter, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <div key={letter + '-' + index}>
                            <motion.h2
                                key={`${letter}-${index}`}
                                className='bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-400 text-2xl font-display font-bold'
                                initial={{
                                    y: isEven ? -15 : 15,
                                    opacity: 0,
                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: 'easeOut',
                                }}
                            >
                                {letter}
                            </motion.h2>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Logo;
