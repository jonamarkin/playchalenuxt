import { h } from 'vue'
import {
    Clock,
    Menu,
    X,
    ChevronRight,
    ChevronLeft,
    ChevronDown,
    ChevronUp,
    MapPin,
    Plus,
    ArrowUp,
    Star,
    Search,
    Filter,
    Calendar,
    Users,
    MessageCircle,
    Trophy,
    Target,
    Zap,
    Check,
    AlertCircle,
    Info,
    Settings,
    User,
    LogOut,
    Edit,
    Share2,
    Send,
    Heart,
    Bookmark,
    MoreHorizontal,
    MoreVertical,
    Grid,
    List,
    Image,
    Camera,
    Mail,
    Phone,
    Globe,
    ExternalLink,
    Home,
    Compass,
    BarChart2,
    Award,
    Shield,
} from '@lucide/vue'

export {
    Clock,
    Menu,
    X,
    ChevronRight,
    ChevronLeft,
    ChevronDown,
    ChevronUp,
    MapPin,
    Plus,
    ArrowUp,
    Star,
    Search,
    Filter,
    Calendar,
    Users,
    MessageCircle,
    Trophy,
    Target,
    Zap,
    Check,
    AlertCircle,
    Info,
    Settings,
    User,
    LogOut,
    Edit,
    Share2,
    Send,
    Heart,
    Bookmark,
    MoreHorizontal,
    MoreVertical,
    Grid,
    List,
    Image,
    Camera,
    Mail,
    Phone,
    Globe,
    ExternalLink,
    Home,
    Compass,
    BarChart2,
    Award,
    Shield,
}

export const SportIcons = {
    Football: (props: any) => h('svg', {
        xmlns: "http://www.w3.org/2000/svg",
        width: props.size || 24,
        height: props.size || 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props.strokeWidth || 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        ...props
    }, [
        h('circle', { cx: "12", cy: "12", r: "10" }),
        h('path', { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" }),
        h('path', { d: "M2 12h20" })
    ]),
    Basketball: (props: any) => h('svg', {
        xmlns: "http://www.w3.org/2000/svg",
        width: props.size || 24,
        height: props.size || 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props.strokeWidth || 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        ...props
    }, [
        h('circle', { cx: "12", cy: "12", r: "10" }),
        h('path', { d: "M12 2v20" }),
        h('path', { d: "M2 12h20" }),
        h('path', { d: "M4.93 4.93c4 4 4 10.14 0 14.14" }),
        h('path', { d: "M19.07 4.93c-4 4-4 10.14 0 14.14" })
    ]),
    Tennis: (props: any) => h('svg', {
        xmlns: "http://www.w3.org/2000/svg",
        width: props.size || 24,
        height: props.size || 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props.strokeWidth || 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        ...props
    }, [
        h('circle', { cx: "12", cy: "12", r: "10" }),
        h('path', { d: "M2 12a10 10 0 0 1 10-10" }),
        h('path', { d: "M12 22a10 10 0 0 1 10-10" })
    ]),
    Padel: (props: any) => h('svg', {
        xmlns: "http://www.w3.org/2000/svg",
        width: props.size || 24,
        height: props.size || 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props.strokeWidth || 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        ...props
    }, [
        h('path', { d: "M4 17l6.5-6.5" }),
        h('circle', { cx: "14", cy: "10", r: "6" }),
        h('path', { d: "M10 6l8 8M12 4l8 8" })
    ]),
    Badminton: (props: any) => h('svg', {
        xmlns: "http://www.w3.org/2000/svg",
        width: props.size || 24,
        height: props.size || 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props.strokeWidth || 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        ...props
    }, [
        h('path', { d: "M7 10a5 5 0 1 1 10 0v10l-5-3-5 3V10Z" }),
        h('path', { d: "M12 17v4" })
    ]),
}

export const Logo = (props: { class?: string, size?: number }) => {
    const size = props.size || 40
    return h('div', {
        class: `bg-[#C6FF00] rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-lime-500/30 ${props.class || ''}`,
        style: { width: `${size}px`, height: `${size}px` }
    }, [
        h(Star, { fill: "black", stroke: "none", size: size * 0.6 })
    ])
}

export function getSportIcon(sport: string) {
    const sportKey = sport as keyof typeof SportIcons
    return SportIcons[sportKey] || SportIcons.Football
}
