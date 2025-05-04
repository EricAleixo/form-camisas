"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/app/components/ui/input";
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
export default function Login() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e: any) => {
        e.preventDefault();
        
        if (password === "atevoinhafaz") {
            localStorage.setItem('adminPassword', password);
            
            router.push('/admin/users');
        } else {
            alert('Senha incorreta');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-[#07038C] mb-4">Login de Admin</h2>
                
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Senha
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-[#07038C] focus:border-[#07038C]"
                            required
                        />
                    </div>
                    
                    <Button
                        type="submit"
                        className="w-full mt-4 bg-[#07038C] text-white py-2 rounded-md hover:bg-[#050290]"
                    >
                        Entrar
                    </Button>
                </form>
            </div>
        </div>
    );
}
