import React from 'react';
import { motion } from 'framer-motion';
const DeviseImage = ({ className, mathSymbol = 'Δ', label = 'Proyecto' }) => {
    return (
        <motion.div
            className={`bg-gradient-to-br from-secondary to-primary border border-silver/10 rounded-xl flex items-center justify-center ${className}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <div className="text-center">
                <div className="text-4xl font-mono text-accent mb-2">{mathSymbol}</div>
                <p className="text-silver text-sm">{label}</p>
            </div>
        </motion.div>
    );
};
export default DeviseImage;