<template>
    <div class="list">
        <div v-if="loading" class="list__load-text">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
            <div class="list__titles">
                <div class="list__title">Name</div>
                <div class="list__title">Email</div>
                <div class="list__title">Phone</div>
                <div class="list__title">Website</div>
            </div>
            <Accordion v-for="user in users" :key="user.id" :user="user">
                <template #accordionHeader>
                    <div class="accordion-header__item">{{ user.name }}</div>
                    <div class="accordion-header__item">{{ user.email }}</div>
                    <div class="accordion-header__item">{{ user.phone }}</div>
                    <div class="accordion-header__item">{{ user.website }}</div>
                </template>
                <template #accordionBody>
                    <Table :user="user">
                        <template #firstHeading>
                            Address
                        </template>
                        <template #secondHeading>
                            Company
                        </template>
                        <template #thirdHeading>
                            Basic info
                        </template>
                    </Table>
                </template>
            </Accordion>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUsersStore } from '../../store/usersStore';
import Accordion from '../Accordion.vue';
import Table from '../Table.vue';
import type { User } from '../../types/User';

const usersStore = useUsersStore();
const users = ref<User[] | null>(null);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

onMounted(async () => {
    loading.value = true;
    try {
        const fetchedUsers = await usersStore.fetchUsers();
        users.value = fetchedUsers;
    } catch (err: any) {
        error.value = err.message || 'Ошибка запроса.';
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped lang="scss">
.list {
    display: flex;
    flex-direction: column;

    &__load-text {
        font-size: 30px;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &__titles {
        font-size: 14px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-bottom: 10px;
    }

    &__title {
        color: $light-grey;
        width: 24%;
    }
}
</style>
