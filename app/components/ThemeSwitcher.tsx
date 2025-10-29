import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronsUpDown, Check, Paintbrush } from 'lucide-react';

interface ThemeSwitcherProps {
    currentTheme: string;
    onThemeChange: (theme: string) => void;
}

const themes = [
    { id: 'Glassmorphism', name: 'Glassmorphism', description: 'Modern glassmorphic design' },
    { id: 'Classic', name: 'Classic', description: 'Traditional Font layout' },
    { id: 'Enterprise', name: 'Enterprise', description: 'Professional SaaS interface' },
    { id: 'SoftModern', name: 'Soft Modern', description: 'Soft gradients and modern UI' },
    { id: 'MinimalLight', name: 'Minimal Light', description: 'Clean and minimal light theme' },
    { id: 'MinimalDark', name: 'Minimal Dark', description: 'Clean and minimal dark theme' },
    { id: 'GreenTech', name: 'Green Tech', description: 'Eco-friendly tech aesthetic' },
];

export function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
    const [selected, setSelected] = useState(
        themes.find(t => t.id === currentTheme) || themes[0]
    );

    const handleChange = (theme: typeof themes[0]) => {
        setSelected(theme);
        onThemeChange(theme.id);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 w-72">
            <Listbox value={selected} onChange={handleChange}>
                <div className="relative">
                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-zinc-900 border border-zinc-700 py-3 pl-3 pr-10 text-left shadow-xl hover:border-zinc-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <div className="flex items-center gap-3">
                            <Paintbrush className="h-5 w-5 text-blue-400" />
                            <div className="flex-1">
                                <span className="block truncate font-medium text-white">
                                    {selected.name}
                                </span>
                                <span className="block truncate text-xs text-zinc-400">
                                    {selected.description}
                                </span>
                            </div>
                        </div>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronsUpDown
                                className="h-5 w-5 text-zinc-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options data-lenis-prevent className="absolute bottom-full mb-2 max-h-60 w-full overflow-auto rounded-lg bg-zinc-900 border border-zinc-700 py-1 shadow-2xl focus:outline-none">
                            {themes.map((theme) => (
                                <Listbox.Option
                                    key={theme.id}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                                            active ? 'bg-zinc-800 text-white' : 'text-zinc-300'
                                        }`
                                    }
                                    value={theme}
                                >
                                    {({ selected }) => (
                                        <>
                                            <div>
                                                <span
                                                    className={`block truncate ${
                                                        selected ? 'font-semibold' : 'font-normal'
                                                    }`}
                                                >
                                                    {theme.name}
                                                </span>
                                                <span className="block truncate text-xs text-zinc-400">
                                                    {theme.description}
                                                </span>
                                            </div>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-400">
                                                    <Check className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
