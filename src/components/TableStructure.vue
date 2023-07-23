<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full shadow-sm text-sm text-center text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <slot name="headers"></slot>
                </tr>
            </thead>
            <tbody>
                <slot name="rows"></slot>
            </tbody>
        </table>
    </div>
</template>