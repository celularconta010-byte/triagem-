import React from 'react';
import { Attendee, EventMetadata, INSTRUMENT_GROUPS, Ministry, Level, Role } from '../types';
import { Button } from './Button';

interface PrintReportProps {
    attendees: Attendee[];
    eventMeta: EventMetadata;
    onBack: () => void;
}

export const PrintReport: React.FC<PrintReportProps> = ({ attendees, eventMeta, onBack }) => {
    const getInstrumentCount = (name: string) => attendees.filter(a => a.instrument === name).length;
    const getNaipeCount = (naipe: keyof typeof INSTRUMENT_GROUPS) => {
        return attendees.filter(a => INSTRUMENT_GROUPS[naipe].includes(a.instrument)).length;
    };

    const organistasCount = attendees.filter(a => a.role === Role.ORGANIST).length;
    const musicosCount = attendees.filter(a => a.role === Role.MUSICIAN).length;
    const totalGeral = attendees.length;

    // Calculate unique cities
    const uniqueCitiesCount = new Set(attendees.map(a => a.city)).size;

    const registeredCordas = INSTRUMENT_GROUPS.Cordas.filter(i => getInstrumentCount(i) > 0);
    const registeredMadeiras = INSTRUMENT_GROUPS.Madeiras.filter(i => getInstrumentCount(i) > 0);
    const registeredMetais = INSTRUMENT_GROUPS.Metais.filter(i => getInstrumentCount(i) > 0);
    const registeredOutros = INSTRUMENT_GROUPS.Outros.filter(i => getInstrumentCount(i) > 0);

    return (
        <div className="print-view bg-white min-h-screen text-black">
            <div className="no-print mb-8 p-6 bg-indigo-50 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm border border-indigo-100">
                <div className="flex-1">
                    <h3 className="font-bold text-indigo-900">Configuração de Impressão</h3>
                    <p className="text-xs text-indigo-700 mt-1">
                        💡 <strong>IMPORTANTE:</strong> Na tela que abrir, clique em <strong>"Mais definições"</strong> e marque a caixa <strong>"Gráficos de segundo plano"</strong> para as cores aparecerem no papel.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={onBack} variant="outline">Voltar</Button>
                    <Button onClick={() => window.print()} className="shadow-lg px-8 bg-indigo-600">IMPRIMIR RELATÓRIO</Button>
                </div>
            </div>

            <div className="max-w-full print:block">
                <div className="flex border-k-double mb-1 p-3">
                    <div className="w-1/4 border-k-2 p-1 text-center flex flex-col items-center justify-center">
                        <div className="font-bold text-[8pt] uppercase">Congregação Cristã</div>
                        <div className="font-bold text-[8pt] uppercase mb-1">no Brasil</div>
                        <div className="w-10 h-10 border-k flex items-center justify-center bg-white">
                            <span className="text-[6pt] font-bold">REGIONAL</span>
                        </div>
                    </div>
                    <div className="flex-1 text-center flex flex-col justify-center px-4">
                        <div className="font-bold text-[12pt]">{eventMeta.local || 'Local não informado'}</div>
                        <div className="font-bold text-[14pt] uppercase tracking-widest mt-1">Ensaio Regional</div>
                        <div className="text-[10pt] italic mt-1">{eventMeta.date}</div>
                    </div>
                </div>

                <table className="mb-2">
                    <tbody>
                        <tr>
                            <td className="w-1/5 bg-header-gray font-bold text-center">Ancião</td>
                            <td className="font-bold">{eventMeta.anciao || ''}</td>
                        </tr>
                        <tr>
                            <td className="bg-header-gray font-bold text-center">Encarregado Regional</td>
                            <td className="font-bold">{eventMeta.regionais || ''}</td>
                        </tr>
                        <tr>
                            <td className="bg-header-gray font-bold text-center">Palavra</td>
                            <td className="font-bold">{eventMeta.palavra || ''}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex gap-1 items-start">
                    <div className="w-[45%]">
                        <table className="border-k">
                            <thead>
                                <tr className="bg-header-gray">
                                    <th colSpan={2}>Instrumentos</th>
                                    <th className="w-10">Qtd.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registeredCordas.length > 0 && (
                                    <>
                                        <tr>
                                            <td rowSpan={registeredCordas.length + 1} className="w-6 bg-cordas text-[7pt] font-bold text-center"><div className="text-vertical">Cordas</div></td>
                                        </tr>
                                        {registeredCordas.map(i => (
                                            <tr key={i}>
                                                <td>{i}</td>
                                                <td className="text-center font-bold">{getInstrumentCount(i)}</td>
                                            </tr>
                                        ))}
                                    </>
                                )}

                                {registeredMadeiras.length > 0 && (
                                    <>
                                        <tr>
                                            <td rowSpan={registeredMadeiras.length + 1} className="w-6 bg-madeiras text-[7pt] font-bold text-center"><div className="text-vertical">Madeiras</div></td>
                                        </tr>
                                        {registeredMadeiras.map(i => (
                                            <tr key={i}>
                                                <td>{i}</td>
                                                <td className="text-center font-bold">{getInstrumentCount(i)}</td>
                                            </tr>
                                        ))}
                                    </>
                                )}

                                {registeredMetais.length > 0 && (
                                    <>
                                        <tr>
                                            <td rowSpan={registeredMetais.length + 1} className="w-6 bg-metais text-[7pt] font-bold text-center"><div className="text-vertical">Metais</div></td>
                                        </tr>
                                        {registeredMetais.map(i => (
                                            <tr key={i}>
                                                <td>{i}</td>
                                                <td className="text-center font-bold">{getInstrumentCount(i)}</td>
                                            </tr>
                                        ))}
                                    </>
                                )}

                                {registeredOutros.length > 0 && (
                                    <>
                                        {registeredOutros.map((i, idx) => (
                                            <tr key={i}>
                                                {idx === 0 && <td rowSpan={registeredOutros.length} className="bg-outros text-[7pt] font-bold text-center">Out.</td>}
                                                <td>{i}</td>
                                                <td className="text-center font-bold">{getInstrumentCount(i)}</td>
                                            </tr>
                                        ))}
                                    </>
                                )}

                                {totalGeral === 0 && (
                                    <tr><td colSpan={3} className="text-center italic py-4">Nenhum registro</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                        <table className="border-k">
                            <thead>
                                <tr className="bg-header-gray">
                                    <th>Ministério</th>
                                    <th className="w-12">Qtd.</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Anciães</td><td className="text-center font-bold">{attendees.filter(a => a.ministry === Ministry.ANCIAO).length}</td></tr>
                                <tr><td>Diáconos</td><td className="text-center font-bold">{attendees.filter(a => a.ministry === Ministry.DIACONO).length}</td></tr>
                                <tr><td>Coop. do Ofício Ministerial</td><td className="text-center font-bold">{attendees.filter(a => a.ministry === Ministry.COOPERADOR_OFICIO).length}</td></tr>
                                <tr><td>Coop. de Jovens e Menores</td><td className="text-center font-bold">{attendees.filter(a => a.ministry === Ministry.COOPERADOR_JOVENS).length}</td></tr>
                                <tr><td>Encarregados Locais</td><td className="text-center font-bold">{attendees.filter(a => a.level === Level.LOCAL).length}</td></tr>
                                <tr><td>Encarregados Regionais</td><td className="text-center font-bold">{attendees.filter(a => a.level === Level.REGIONAL).length}</td></tr>
                                <tr><td>Examinadoras</td><td className="text-center font-bold">{attendees.filter(a => a.ministry === Ministry.EXAMINADORA).length}</td></tr>
                                <tr className="bg-header-gray font-bold">
                                    <td className="text-right uppercase">Total</td>
                                    <td className="text-center">
                                        {attendees.filter(a => a.ministry !== Ministry.NONE && a.ministry !== Ministry.ORGANISTA).length +
                                            attendees.filter(a => a.level === Level.LOCAL || a.level === Level.REGIONAL).length}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="border-k">
                            <thead>
                                <tr className="bg-header-gray">
                                    <th>Hinos Ensaiados</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(eventMeta.hinos.split(',') || []).map((h, idx) => (
                                    <tr key={idx}>
                                        <td className="py-1">{h.trim() || ''}</td>
                                    </tr>
                                ))}
                                {!eventMeta.hinos && [1, 2, 3, 4, 5].map(i => <tr key={i}><td className="py-2"></td></tr>)}
                            </tbody>
                        </table>

                        <div className="grid grid-cols-2 gap-1">
                            <table className="border-k">
                                <tbody>
                                    <tr className="bg-header-gray font-bold"><td>Comparecimento</td><td className="w-12 text-center">Qtd.</td></tr>
                                    <tr><td className="font-bold">Localidades</td><td className="text-center font-bold">{uniqueCitiesCount}</td></tr>
                                    <tr><td className="font-bold">Organistas</td><td className="text-center bg-summary-orange font-bold">{organistasCount}</td></tr>
                                    <tr><td className="font-bold">Músicos</td><td className="text-center bg-summary-blue font-bold">{musicosCount}</td></tr>
                                    <tr className="bg-summary-yellow font-bold"><td className="text-right uppercase">Total Geral</td><td className="text-center">{totalGeral}</td></tr>
                                </tbody>
                            </table>

                            <table className="border-k">
                                <tbody>
                                    <tr className="bg-header-gray font-bold"><td>Distribuição</td><td className="w-12 text-center">Qtd.</td></tr>
                                    <tr><td className="font-bold text-[8pt]">Cordas</td><td className="text-center bg-cordas font-bold">{getNaipeCount('Cordas')}</td></tr>
                                    <tr><td className="font-bold text-[8pt]">Madeiras</td><td className="text-center bg-madeiras font-bold">{getNaipeCount('Madeiras')}</td></tr>
                                    <tr><td className="font-bold text-[8pt]">Metais</td><td className="text-center bg-metais font-bold">{getNaipeCount('Metais')}</td></tr>
                                    <tr><td className="font-bold text-[8pt]">Outros</td><td className="text-center bg-outros font-bold">{getNaipeCount('Outros')}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-1 border-t-2 border-black flex justify-between items-end">
                    <div className="text-[6pt] uppercase font-bold">Secretaria Musical - Regional {eventMeta.local.split('-').pop()?.trim() || ''}</div>
                    <div className="text-[6pt] italic">Gerado via Sistema de Triagem Musical</div>
                </div>
            </div>
        </div>
    );
};
