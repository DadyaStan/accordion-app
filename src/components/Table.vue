<template>
  <div class="table-box">
    <div class="table">
      <div class="table__col">
        <div class="table__title">
          <slot name="firstHeading">Column 1</slot>
        </div>
        <div class="table__list">
          <Input v-for="(_, fieldTitle) in userAddress" :key="fieldTitle" v-model="userAddress[fieldTitle]"
            :label="fieldTitle" />
        </div>
      </div>
      <div class="table__col">
        <div class="table__title">
          <slot name="secondHeading">Column 2</slot>
        </div>
        <div class="table__list">
          <Input v-for="(_, fieldTitle) in userCompany" :key="fieldTitle" v-model="userCompany[fieldTitle]"
            :label="fieldTitle" />
        </div>
      </div>
      <div class="table__col">
        <div class="table__title">
          <slot name="thirdHeading">Column 3</slot>
        </div>
        <div class="table__list">
          <Input v-for="(_, fieldTitle) in userInfo" :key="fieldTitle" v-model="userInfo[fieldTitle]"
            :label="fieldTitle" />
        </div>
      </div>
    </div>
    <Button @click="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { reactive, toRaw, defineProps } from 'vue';
import Input from './common/Input.vue';
import Button from './common/Button.vue';
import type { Address, Company, User } from '../types/User';

interface Personal {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const props = defineProps<{
  user: User;
}>();

const userAddress = reactive<Address>({
  street: props.user.address.street,
  suite: props.user.address.suite,
  city: props.user.address.city,
  zipcode: props.user.address.zipcode,
});

const userCompany = reactive<Company>({
  name: props.user.company.name,
  catchPhrase: props.user.company.catchPhrase,
  bs: props.user.company.bs,
});

const userInfo = reactive({
  name: props.user.name,
  username: props.user.username,
  email: props.user.email,
  phone: props.user.phone,
  website: props.user.website,
});

const originalUser = {
  address: { ...props.user.address },
  company: { ...props.user.company },
  info: {
    name: props.user.name,
    username: props.user.username,
    email: props.user.email,
    phone: props.user.phone,
    website: props.user.website,
  },
};

const handleSubmit = () => {
  const changes: { [key: string]: string } = {};

  const address = toRaw(userAddress);
  const company = toRaw(userCompany);
  const info = toRaw(userInfo);

  for (const key in address) {
    if (address[key as keyof Address] !== originalUser.address[key as keyof Address]) {
      changes[`Address ${key}`] = address[key as keyof Address];
    }
  }

  for (const key in company) {
    if (company[key as keyof Company] !== originalUser.company[key as keyof Company]) {
      changes[`Company ${key}`] = company[key as keyof Company];
    }
  }

  for (const key in info) {
    if (info[key as keyof Personal] !== originalUser.info[key as keyof Personal]) {
      changes[key] = info[key as keyof Personal];
    }
  }

  if (Object.keys(changes).length === 0) {
    alert(`Данные пользователя ${originalUser.info.name} не изменены.`);
  } else {
    let structuredChanges = `Новые данные пользователя ${originalUser.info.name}:\n\n`;

    for (const key in changes) {
      if (!changes[key]) {
        structuredChanges += `${key}: Данные удалены\n`;
      } else {
        structuredChanges += `${key}: ${changes[key]}\n`;
      }
    }

    alert(structuredChanges);
  }
};
</script>

<style scooped lang="scss">
.table-box {
  display: flex;
  justify-content: space-between;
}

.table {
  width: 1100px;
  display: flex;
  border: 1px solid $light-grey;
  border-radius: 5px;

  &__col {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid $light-grey;

    &:last-child {
      border-right: none;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 13px 20px 20px;
  }

  &__title {
    color: #696969;
    font-size: 16px;
    width: 100%;
    height: 40px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid $light-grey;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__label {
    color: $light-grey;
    font-size: 12px;
    margin-bottom: 3px;
  }

  &__input {
    height: 32px;
    border: 1px solid $light-grey;
    border-radius: 5px;
    padding-left: 10px;
  }
}
</style>
