'use client';
import React from 'react';
import PatientForm from '@/components/forms/RegisterForm';
import LoginForm from './forms/LoginForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

function LoginTabs() {
	const [activeTab, setActiveTab] = React.useState('login');
	return (
		<>
			<section className="mb-12 space-y-4">
				<h1 className="header">¡Bienvenido! 👋</h1>
				<p className="text-dark-700">Separa tu atención médica</p>
			</section>
			<Tabs
				defaultValue="login"
				className="w-[400px]"
				onValueChange={setActiveTab}
			>
				<TabsList className="grid w-full grid-cols-2 shad-tab-list">
					<TabsTrigger
						className={cn('shad-btn-tab', {
							'bg-dark-300': activeTab === 'login',
						})}
						value="login"
					>
						Iniciar Sesion
					</TabsTrigger>
					<TabsTrigger
						className={cn(
							{
								'bg-dark-300': activeTab === 'register',
							},
							'shad-btn-tab'
						)}
						value="register"
					>
						Registrarse
					</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<LoginForm />
				</TabsContent>
				<TabsContent value="register">
					<PatientForm  />
				</TabsContent>
			</Tabs>
		</>
	);
}

export default LoginTabs;
