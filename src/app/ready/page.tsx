"use client"

import React, { useState, useCallback } from 'react';
import { Button, Box, Typography, Container } from '@mui/material';

const HomePage = () => {
    const [userBalance, setUserBalance] = useState(3.25);  // Initial balance
    const [diceResult, setDiceResult] = useState<number | null>(null);  // Dice result
    const [userChoice, setUserChoice] = useState<null | 'odd' | 'even'>(null);  // User choice
    const [gameStatus, setGameStatus] = useState<string>('게임을 시작하세요!');  // Game status message

    // Roll the dice with manipulated probabilities based on user's choice
    const rollManipulatedDice = useCallback(() => {
        if (!userChoice) return null;

        const probability = Math.random(); // Generate a random value between 0 and 1
        const isOdd = userChoice === 'odd';

        // Return dice result based on manipulated probabilities
        if (isOdd) {
            return probability < 0.2 ? getRandomOdd() : getRandomEven();
        } else {
            return probability < 0.2 ? getRandomEven() : getRandomOdd();
        }
    }, [userChoice]);

    // Generate a random odd number (1, 3, 5)
    const getRandomOdd = () => [1, 3, 5][Math.floor(Math.random() * 3)];

    // Generate a random even number (2, 4, 6)
    const getRandomEven = () => [2, 4, 6][Math.floor(Math.random() * 3)];

    // Check the winner and update the game state
    const checkWinner = useCallback((result: number) => {
        if (userChoice === null) {
            setGameStatus('홀수/짝수를 선택해주세요!');
            return;
        }

        const isWin = (userChoice === 'odd' && result % 2 !== 0) || (userChoice === 'even' && result % 2 === 0);
        setGameStatus(isWin ? '승리! 돈을 얻었습니다.' : '패배! 돈을 잃었습니다.');
        setUserBalance(prev => prev + (isWin ? 1 : -1));
    }, [userChoice]);

    // Roll dice function
    const rollDice = useCallback(() => {
        const result = rollManipulatedDice();
        if (result !== null) {
            setDiceResult(result);
            checkWinner(result);
        }
    }, [rollManipulatedDice, checkWinner]);

    // Handle user choice (odd or even)
    const handleChoice = useCallback((choice: 'odd' | 'even') => {
        setUserChoice(choice);
        setGameStatus(`선택한 값: ${choice === 'odd' ? '홀수' : '짝수'}`);
    }, []);

    return (
        <Container
            maxWidth="sm"
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#282c34',
                color: 'white',
                padding: 2,
            }}
        >
            {/* Header */}
            <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                <Typography variant="h3" component="h1">
                    가상화폐 도박
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                    현재 가상화폐 잔액: {userBalance.toFixed(2)} BTC
                </Typography>
            </Box>

            {/* Dice Game Area */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                <Typography variant="h5" sx={{ marginBottom: 3 }}>
                    {gameStatus}
                </Typography>
                {diceResult !== null && (
                    <Box sx={{ marginBottom: 3 }}>
                        <Typography variant="h4">주사위 결과: {diceResult}</Typography>
                    </Box>
                )}
                <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
                    <Button
                        variant="outlined"
                        color={userChoice === 'odd' ? 'success' : 'primary'}
                        onClick={() => handleChoice('odd')}
                        sx={{ width: '100px' }}
                    >
                        홀수
                    </Button>
                    <Button
                        variant="outlined"
                        color={userChoice === 'even' ? 'success' : 'primary'}
                        onClick={() => handleChoice('even')}
                        sx={{ width: '100px' }}
                    >
                        짝수
                    </Button>
                </Box>

                <Button
                    variant="contained"
                    color="warning"
                    sx={{ padding: '16px 32px', fontSize: '20px', width: '200px' }}
                    onClick={rollDice}
                >
                    주사위 던지기
                </Button>
            </Box>

            {/* Footer */}
            <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="body2">게임 설명 및 규칙</Typography>
                <Typography variant="body2">지원 문의</Typography>
            </Box>
        </Container>
    );
};

export default HomePage;
