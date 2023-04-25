import { useMotionValue, useSpring, useTransform } from "framer-motion";

export default function usePreviewMotionValue() {
    const motionVal = useMotionValue(1);
    const transform = useTransform(motionVal, [0, 100], [0.7, 1.5]);
    const spring = useSpring(transform, { stiffness: 500, damping: 250 });
    
    return {
        motionVal,
        scaleVal: spring
    }
}