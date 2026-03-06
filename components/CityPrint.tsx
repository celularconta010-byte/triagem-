import React from 'react';
import { Attendee, EventMetadata } from '../types';
import { Button } from './Button';

interface CityPrintProps {
    attendees: Attendee[];
    eventMeta: EventMetadata;
    onBack: () => void;
}

export const CityPrint: React.FC<CityPrintProps> = ({ attendees, eventMeta, onBack }) => {
    const cityCounts = attendees.reduce((acc, curr) => {
        acc[curr.city] = (acc[curr.city] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const sortedCities = Object.keys(cityCounts).sort();
    const totalCities = sortedCities.length;
    const totalAttendees = attendees.length;

    return (
        <div className="bg-white min-h-screen text-black p-8">
            <div className="no-print mb-8 p-6 bg-emerald-50 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm border border-emerald-100">
                <div className="flex-1">
                    <h3 className="font-bold text-emerald-900">Impressão de Localidades</h3>
                    <p className="text-xs text-emerald-700 mt-1">
                        Relatório simplificado com a contagem de participantes por cidade/localidade.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={onBack} variant="outline">Voltar ao Painel</Button>
                    <Button onClick={() => window.print()} className="shadow-lg px-8 bg-emerald-600 hover:bg-emerald-700 text-white border-none">
                        IMPRIMIR LISTA
                    </Button>
                </div>
            </div>

            <div className="max-w-2xl mx-auto border-k p-8 print:p-0 print:border-none">
                <header className="text-center mb-8 border-b-2 border-black pb-4">
                    <h1 className="text-xl font-bold uppercase">{eventMeta.eventTitle || 'Ensaio Regional'}</h1>
                    <p className="text-sm font-bold uppercase mt-1">{eventMeta.local}</p>
                    <p className="text-sm mt-1">{eventMeta.date}</p>
                    <h2 className="text-lg font-bold uppercase mt-4 underline">Lista de Localidades Presentes</h2>
                </header>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-k">
                            <th className="border-k p-2 text-left uppercase text-sm">Cidade / Localidade</th>
                            <th className="border-k p-2 text-center uppercase text-sm w-24">Qtd.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCities.map(city => (
                            <tr key={city} className="border-k">
                                <td className="border-k p-2 text-sm uppercase">{city}</td>
                                <td className="border-k p-2 text-center font-bold text-sm bg-gray-50">{cityCounts[city]}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="border-k font-bold bg-gray-100">
                            <td className="border-k p-2 text-right uppercase text-sm">Total de Localidades: {totalCities}</td>
                            <td className="border-k p-2 text-center text-sm">{totalAttendees}</td>
                        </tr>
                    </tfoot>
                </table>

                <footer className="mt-12 pt-4 border-t border-black flex justify-between items-end italic text-[9pt]">
                    <div>Secretaria Musical</div>
                    <div>Gerado em: {new Date().toLocaleString('pt-BR')}</div>
                </footer>
            </div>

            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; padding: 0 !important; }
                    .border-k { border: 1px solid black !important; }
                }
                .border-k { border: 1px solid black !important; }
            `}</style>
        </div>
    );
};
