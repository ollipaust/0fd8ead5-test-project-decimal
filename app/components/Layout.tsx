interface LayoutProps {
    children?: React.ReactNode;
    themeName?: string;
}

export default function Layout({ children }: LayoutProps) {
    // Don't apply any wrapper - themes handle their own layout
    // This component is just a pass-throughs
    return <>{children}</>;
}
