"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function KalaSnake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);

  // --- FIX: Prevent food from spawning on snake body ---
  const generateValidFood = useCallback((currentSnake: typeof INITIAL_SNAKE) => {
    let newFood;
    let isInvalid = true;
    
    while (isInvalid) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Check collision with any snake segment
      const collision = currentSnake.some(seg => seg.x === newFood!.x && seg.y === newFood!.y);
      if (!collision) isInvalid = false;
    }
    return newFood!;
  }, []);

  const startGame = () => {
    const startSnake = INITIAL_SNAKE;
    setSnake(startSnake);
    setDirection(INITIAL_DIRECTION);
    setIsGameOver(false);
    setIsRunning(true);
    setScore(0);
    setFood(generateValidFood(startSnake));
  };

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const newHead = {
        x: (prevSnake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (prevSnake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        setIsRunning(false);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 1);
        setFood(generateValidFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, generateValidFood]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  }, [isRunning, moveSnake]);

  // --- FIX: Prevent Page Scroll ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isRunning) return;

      // This array contains keys we want to hijack from the browser
      const gameKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
      
      if (gameKeys.includes(e.key)) {
        e.preventDefault(); // <--- This stops the page from moving!
      }

      switch (e.key) {
        case "ArrowUp": if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case "ArrowDown": if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case "ArrowLeft": if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case "ArrowRight": if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, direction]);

  return (
    <div 
      onClick={() => !isRunning && startGame()}
      className="relative w-full aspect-square bg-[#121212] border-4 border-[#1a1a1a] cursor-pointer overflow-hidden group select-none"
    >
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-10 pointer-events-none">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-[#F8F9FA]" />
        ))}
      </div>

      {/* Rendering */}
      {!isGameOver && isRunning && (
        <>
          {/* FOOD - Now guaranteed visible */}
          <div 
            className="absolute bg-[#e63946] w-[5%] h-[5%] z-10"
            style={{ left: `${food.x * 5}%`, top: `${food.y * 5}%` }}
          >
             <div className="w-full h-full animate-pulse bg-[#ffef00]/20" />
          </div>

          {/* SNAKE */}
          {snake.map((segment, i) => (
            <div 
              key={i}
              className="absolute bg-[#ffef00] border border-[#121212] w-[5%] h-[5%]"
              style={{ 
                left: `${segment.x * 5}%`, 
                top: `${segment.y * 5}%`,
                zIndex: 5
              }}
            />
          ))}
        </>
      )}

      {/* UI States */}
      <AnimatePresence>
        {!isRunning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#121212]/90 backdrop-blur-[2px] z-20"
          >
            <h4 className="text-[#ffef00] text-4xl mb-4 uppercase font-black italic tracking-tighter">
              {isGameOver ? "RITUAL_FAILED" : "KALA_SNAKE"}
            </h4>
            <p className="text-white text-[10px] animate-pulse uppercase tracking-[0.3em] font-bold">
              {isGameOver ? "Click to retry" : "Click to initialize"}
            </p>
            {isGameOver && (
               <div className="mt-4 bg-[#e63946] px-4 py-1 text-white text-xs font-black uppercase">
                 SCORE: {score}
               </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-2 left-2 text-[8px] text-white/20 font-mono uppercase tracking-widest">
        INPUT: ARROWS // STATUS: {isRunning ? 'ACTIVE' : 'IDLE'}
      </div>
    </div>
  );
}