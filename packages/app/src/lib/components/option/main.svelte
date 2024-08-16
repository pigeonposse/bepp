<script lang="ts">

    import { Toggle } from "flowbite-svelte";
    import { Fa, faGear, faInfo, type IconDefinition, Btn } from "$lib";
    
    export let icon: IconDefinition | undefined | string= undefined
    export let title = ""
    export let activeDesc = false
    export let config = true
    export let value = true
    
    let active = false
    const toggleActive = () => active = active == false ? true : false
    const toggleActiveDesc= () => activeDesc = activeDesc == false ? true : false
    
</script>
<div class="flex flex-col w-full p-4 bg-primary-900/20 hover:bg-primary-900/30 transition-all duration-300 rounded-lg">
    <div  class="flex justify-between w-full">
        <div class="text-primary-100 flex items-center gap-2">
            {#if icon}
                <div class="p-2 rounded-full bg-primary-700/50">
                    {#if typeof icon !== 'string'}
                        <Fa {icon} class="w-[20px] h-[20px]"/>
                    {:else}
                        <img 
							src="{icon}"
							alt="{title}"  
							class="w-[20px] h-[20px]" 
							width="20px"
							height="20px"
							loading="lazy"
						/>
                    {/if}
                </div>
            {/if}
            {title}
        </div>
        <div class="flex flex-row gap-2 items-center">
            {#if $$slots.desc }
                <Btn 
                    type="transparent" 
                    on:click={() => toggleActiveDesc()}
					class="opacity-50 text-xs px-3 !text-primary-300 hover:!text-primary-200"
                >
                    <Fa icon="{faInfo}" />
                </Btn>
            {/if}
            {#if config }
                <Btn 
					type="transparent" 
					on:click={() => toggleActive()}
					class="opacity-50 text-xs px-3 !text-primary-300 hover:!text-primary-200"
				>
                    <Fa icon="{faGear}" />
                </Btn>
            {/if}
            {#if $$slots.value }
                <slot name="value"/>
            {:else}
                <Toggle bind:checked={value} />
            {/if}
        </div>
    </div>
    {#if activeDesc }
        <div class="p-1 mt-4 rounded-lg text-xs text-primary-300">
            <slot name="desc"/>
        </div>
    {/if}
    {#if active && config }
        <div class="bg-primary-800/50 p-2 mt-4 rounded-lg">
            <slot/>
        </div>
    {/if}

</div>
