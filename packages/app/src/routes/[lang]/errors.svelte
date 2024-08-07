<script lang="ts">

	import { NotificationSection, Notification } from "$lib";
	import type { LayoutData } from "../$types";
	
	export let data: LayoutData
	const {core, t} = data
	const {api } = core
	const { error, onError, apiGeneralError, facts, extension} = api

</script>
{#if $onError && $error}

	<NotificationSection>
		{#if $error}
			<Notification
				onClose={ async () => {
					error.set(undefined)
					apiGeneralError.set(undefined)
					facts.error.set(undefined)
					extension.error.set(undefined)
				}}

			>
			<div class="flex flex-col gap-2">
				<span class="font-bold">Error ID: {$error}</span>
				<span>
					{$t(`common.apiErrors.${$error}`).replace(`common.apiErrors.${$error}`, $t(`common.apiErrors.UNDEFINED`))}
				</span>
				
			</div>
			</Notification>
		{/if}
	</NotificationSection>

{/if}
