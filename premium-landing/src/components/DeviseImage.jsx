import React from 'react';
import { motion } from 'framer-motion';

const DeviseImage = ({ className, mathSymbol = 'Δ', label = 'Proyecto' }) => {
    return (
        <motion.div
            className={`bg-gradient-to-br from-[#1C045A] to-[#584485] border border-white/10 rounded-xl flex items-center justify-center ${className}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <div className="text-center p-4">
                <div className="text-4xl font-mono text-[#9AD4EA] mb-2">{mathSymbol}</div>
                <p className="text-white text-sm" style={{ fontFamily: 'Aurora' }}>{label}</p>
            </div>
        </motion.div>
    );
};

export default DeviseImage;