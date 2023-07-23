<template>
    <section class="flex">
        <div class="mx-auto w-full my-2">
            <!-- Start coding here -->
            <div class="bg-gray-50 shadow-md dark:bg-gray-800 sm:rounded-lg">
                <div class="flex flex-col items-center justify-between p-3 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <slot></slot>
                </div>
            </div>
        </div>
    </section>
</template>