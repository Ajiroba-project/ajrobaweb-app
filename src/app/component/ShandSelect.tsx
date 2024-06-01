'use client'
import React, { useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SelectProps {
    label: string;
    type?: string;
    name: string;
    placeholder?: string;
    // register: any;
    errors: any;
    options: { value: string; label: string }[];
    isSelected: boolean; // Add isSelected prop
    setIsSelected: (value: boolean) => void; // Add setIsSelected prop
}

const ShandSelect: React.FC<SelectProps> = ({
    label,
    name,
    options,
    // register,
    errors,
    isSelected,
    setIsSelected,
}) => {


    return (
        <div className="flex flex-col">
            <label className="text-sm">{label}</label>
            <Select name={name}  >
                <SelectTrigger className="px-8 h-12">
                    <SelectValue placeholder={`Select a ${label}`} />
                </SelectTrigger>
                <SelectContent className="text-wdc-textbody">
                    {options?.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                            onChange={() => {
                                setIsSelected(true);
                            }}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {/* <div className="text-xs text-red-700">{errors?.[name]?.message}</div> */}
        </div>
    );
};

export default ShandSelect;
