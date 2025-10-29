interface ContentProps {
    children: React.ReactNode;
    isBoxed?: boolean;
}

const Content = ({ children, isBoxed = true }: ContentProps) => {
    return (
        <>
            <div className={`relative block h-full w-full ${isBoxed ? 'p-6' : ''}`}>
                {children}
            </div>
        </>
    );
};

export default Content;
